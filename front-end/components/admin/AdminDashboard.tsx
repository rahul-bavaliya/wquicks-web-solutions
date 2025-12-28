import React, { useState, useEffect, useMemo } from 'react';
import { brandTheme } from '../../utils/theme';
import { generateContractPDF } from '../../utils/contractGenerator';
import { API_ENDPOINTS } from '../../utils/api';
import { Logo } from '../ui/Logo';
import { DateTime } from 'luxon';
import { jsPDF } from 'jspdf';
import {
    CheckCircle, Clock, Mail, Phone, User, Trash2, ArrowLeft, RefreshCw,
    Filter, MessageSquare, Download, Save, Check, FileText, Sparkles,
    X, Loader2, Edit2, Search, ExternalLink, MoreVertical,
    ChevronUp, ChevronDown, Share2, Trash, Settings
} from 'lucide-react';

import { Inquiry, Theme } from '../../types';

interface AdminDashboardProps {
    theme: Theme;
    token: string;
    onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ theme, token, onLogout }) => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // UI State
    const [filter, setFilter] = useState<'all' | 'pending' | 'contacted' | 'customer'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

    // Inline Editing
    const [editingNotes, setEditingNotes] = useState<number | null>(null);
    const [notesValue, setNotesValue] = useState('');

    // Modals
    const [convertingInquiry, setConvertingInquiry] = useState<Inquiry | null>(null);
    const [contractLength, setContractLength] = useState('');
    const [contractDetails, setContractDetails] = useState('');
    const [additionalTerms, setAdditionalTerms] = useState('');
    const [editingInquiry, setEditingInquiry] = useState<Inquiry | null>(null);
    const [deletingInquiry, setDeletingInquiry] = useState<Inquiry | null>(null);
    const [uploadingFor, setUploadingFor] = useState<number | null>(null);

    // Edit Form
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        status: 'pending' as 'pending' | 'contacted' | 'customer',
        admin_notes: '',
        contract_length: '',
        contract_details: '',
        additional_terms: ''
    });

    const isDark = theme === 'dark';

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_ENDPOINTS.ADMIN_CONTACTS, {
                headers: { 'X-Admin-Password': token }
            });
            const result = await response.json();
            if (response.status === 401) { onLogout(); return; }
            if (result.success) {
                setInquiries(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to connect to backend');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchInquiries(); }, []);

    // Filtered and Sorted Data
    const displayInquiries = useMemo(() => {
        let list = inquiries.filter(i => {
            const matchesFilter = filter === 'all' || i.status === filter;
            const matchesSearch =
                i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                i.phone.includes(searchTerm) ||
                i.message.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        return list.sort((a, b) => {
            const dateA = DateTime.fromISO(a.created_at).toMillis();
            const dateB = DateTime.fromISO(b.created_at).toMillis();
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });
    }, [inquiries, filter, searchTerm, sortOrder]);

    // Unified action handler for cross-state updates
    const handleActionSuccess = (updatedItem?: Partial<Inquiry>, id?: number) => {
        if (updatedItem && id) {
            setInquiries(prev => prev.map(i => i.id === id ? { ...i, ...updatedItem, updated_at: new Date().toISOString() } : i));
        } else {
            fetchInquiries();
        }
    };

    const toggleStatus = async (inquiry: Inquiry, forceStatus?: string) => {
        const newStatus = forceStatus || (inquiry.status === 'pending' ? 'contacted' : 'pending');
        setIsUpdating(true);
        try {
            const response = await fetch(API_ENDPOINTS.ADMIN_STATUS(inquiry.id), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Admin-Password': token },
                body: JSON.stringify({
                    status: newStatus,
                    contract_length: newStatus === 'customer' ? contractLength : inquiry.contract_length,
                    contract_details: newStatus === 'customer' ? contractDetails : inquiry.contract_details,
                    additional_terms: newStatus === 'customer' ? additionalTerms : inquiry.additional_terms
                }),
            });
            if (response.status === 401) return onLogout();
            const result = await response.json();
            if (result.success) {
                handleActionSuccess({
                    status: newStatus as any,
                    contract_length: newStatus === 'customer' ? contractLength : inquiry.contract_length,
                    contract_details: newStatus === 'customer' ? contractDetails : inquiry.contract_details,
                    additional_terms: newStatus === 'customer' ? additionalTerms : inquiry.additional_terms
                }, inquiry.id);
                setConvertingInquiry(null);
                setContractLength('');
                setContractDetails('');
                setAdditionalTerms('');
            }
        } catch (err) { setError('Status update failed'); }
        finally { setIsUpdating(false); }
    };

    const deleteInquiry = async () => {
        if (!deletingInquiry) return;
        setIsUpdating(true);
        try {
            const response = await fetch(API_ENDPOINTS.ADMIN_DELETE(deletingInquiry.id), {
                method: 'DELETE',
                headers: { 'X-Admin-Password': token }
            });
            const result = await response.json();
            if (result.success) {
                setInquiries(prev => prev.filter(i => i.id !== deletingInquiry.id));
                setDeletingInquiry(null);
            }
        } catch (err) { setError('Deletion failed'); }
        finally { setIsUpdating(false); }
    };

    const updateInquiryDetails = async () => {
        if (!editingInquiry) return;
        setIsUpdating(true);
        try {
            const response = await fetch(API_ENDPOINTS.ADMIN_UPDATE(editingInquiry.id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'X-Admin-Password': token },
                body: JSON.stringify(editForm),
            });
            const result = await response.json();
            if (result.success) {
                handleActionSuccess(editForm, editingInquiry.id);
                setEditingInquiry(null);
            }
        } catch (err) { setError('Update failed'); }
        finally { setIsUpdating(false); }
    };

    const saveNotes = async (id: number) => {
        setIsUpdating(true);
        try {
            const response = await fetch(API_ENDPOINTS.ADMIN_NOTES(id), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Admin-Password': token },
                body: JSON.stringify({ notes: notesValue }),
            });
            const result = await response.json();
            if (result.success) {
                handleActionSuccess({ admin_notes: notesValue }, id);
                setEditingNotes(null);
            }
        } catch (err) { setError('Notes update failed'); }
        finally { setIsUpdating(false); }
    };

    const exportToCSV = () => {
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Status', 'Message', 'Notes', 'Contract Length', 'Details', 'Created At'];
        const rows = inquiries.map(i => [
            i.id, i.name, i.email, i.phone, i.status,
            `"${i.message?.replace(/"/g, '""')}"`,
            `"${(i.admin_notes || '').replace(/"/g, '""')}"`,
            i.contract_length || '',
            `"${(i.contract_details || '').replace(/"/g, '""')}"`,
            i.created_at
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `WQuicks_Inquiries_${DateTime.now().toFormat('yyyy-MM-dd')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const uploadSignedContract = async (id: number, file: File) => {
        setIsUpdating(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch(API_ENDPOINTS.ADMIN_UPLOAD_CONTRACT(id), {
                method: 'POST',
                headers: { 'X-Admin-Password': token },
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                handleActionSuccess({
                    signed_contract_key: result.key,
                    signed_contract_url: result.url
                }, id);
                setUploadingFor(null);
            }
        } catch (err) { setError('Upload failed'); }
        finally { setIsUpdating(false); }
    };

    const downloadSignedContract = async (inquiry: Inquiry) => {
        try {
            setIsUpdating(true); // Mask interaction during stream
            const response = await fetch(API_ENDPOINTS.ADMIN_DOWNLOAD_SIGNED(inquiry.id), {
                headers: { 'X-Admin-Password': token }
            });

            if (!response.ok) throw new Error('Document retrieval failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');

            const disposition = response.headers.get('Content-Disposition');
            let filename = 'Signed_Contract.pdf';
            if (disposition && disposition.includes('filename=')) {
                filename = disposition.split('filename=')[1].replace(/"/g, '');
            }

            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error(err);
            alert('Failed to securely stream the document.');
        } finally {
            setIsUpdating(false);
        }
    };

    const removeSignedContract = async (id: number) => {
        if (!confirm('Are you sure you want to permanently delete this signed contract? You will need to re-upload it.')) return;

        try {
            setIsUpdating(true);
            const response = await fetch(API_ENDPOINTS.ADMIN_DELETE_CONTRACT(id), {
                method: 'DELETE',
                headers: { 'X-Admin-Password': token }
            });

            const result = await response.json() as any;
            if (result.success) {
                handleActionSuccess({ signed_contract_key: undefined, signed_contract_url: undefined }, id);
            } else {
                alert(result.message || 'Deletion failed');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to connect to server');
        } finally {
            setIsUpdating(false);
        }
    };

    const downloadContract = (inquiry: Inquiry) => {
        generateContractPDF(inquiry);
    };

    const stats = {
        total: inquiries.length,
        pending: inquiries.filter(i => i.status === 'pending').length,
        contacted: inquiries.filter(i => i.status === 'contacted').length,
        customers: inquiries.filter(i => i.status === 'customer').length,
    };

    if (loading && inquiries.length === 0) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                <div className="text-center">
                    <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4 text-brand-primary" />
                    <p className="font-bold tracking-widest uppercase text-xs animate-pulse">Initializing Console...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen p-4 lg:p-12 relative ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>

            {/* Syncing Overlay */}
            {isUpdating && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-[4px] transition-all">
                    <div className={`p-10 rounded-[3rem] shadow-2xl flex flex-col items-center gap-6 ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white'}`}>
                        <div className="relative">
                            <div className="h-20 w-20 rounded-full border-4 border-brand-primary/10 border-t-brand-primary animate-spin" />
                            <Sparkles className="absolute inset-0 m-auto text-brand-primary animate-pulse" size={24} />
                        </div>
                        <div className="text-center">
                            <p className="font-black uppercase tracking-[0.3em] text-[10px] text-brand-primary">Writing to D1</p>
                            <p className="text-[9px] opacity-40 font-bold uppercase mt-1">Consistency check in progress...</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-[1600px] mx-auto">
                {/* Modern Header */}
                <div className="mb-12 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-brand-primary/10 rounded-[2rem]">
                            <Logo theme={theme} className="h-12 w-12" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-4xl font-black tracking-tighter">Command Center</h1>
                                <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[9px] font-black uppercase tracking-widest rounded-md">Live Platform</span>
                            </div>
                            <p className={`text-sm font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Omni-channel Inquiry & Customer Management System</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button onClick={exportToCSV} className={`px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-2 ${isDark ? 'bg-slate-900 hover:bg-slate-800' : 'bg-white shadow-sm hover:shadow-md'}`}>
                            <Share2 size={16} /> Export CSV
                        </button>
                        <button onClick={fetchInquiries} className={`p-4 rounded-2xl transition-all ${isDark ? 'bg-slate-900 hover:bg-slate-800' : 'bg-white shadow-sm hover:shadow-md'}`}>
                            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                        </button>
                        <button onClick={onLogout} className={`px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${isDark ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Advanced Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Volume', value: stats.total, icon: Mail, color: 'text-slate-500', bg: 'bg-slate-500/10' },
                        { label: 'Unprocessed', value: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                        { label: 'Active Leads', value: stats.contacted, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
                        { label: 'Retention', value: stats.customers, icon: Sparkles, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
                    ].map((stat, i) => (
                        <div key={i} className={`p-8 rounded-[2.5rem] border group hover:scale-[1.02] transition-all duration-500 ${isDark ? 'bg-slate-900 border-slate-800/50' : 'bg-white border-slate-100 shadow-sm'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:rotate-6 transition-transform`}>
                                    <stat.icon size={28} />
                                </div>
                                <span className="text-5xl font-black tracking-tighter">{stat.value}</span>
                            </div>
                            <p className="font-black uppercase tracking-[0.2em] text-[10px] opacity-40">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Operations Bar */}
                <div className={`p-4 mb-8 rounded-[2rem] border flex flex-col md:flex-row items-center gap-4 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full pl-14 pr-6 py-4 rounded-[1.5rem] text-sm font-bold outline-none border-none transition-all ${isDark ? 'bg-slate-950/50 focus:bg-slate-950' : 'bg-slate-50 focus:bg-slate-100/50'}`}
                        />
                    </div>

                    <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                        {(['all', 'pending', 'contacted', 'customer'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-brand-primary text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                        className={`p-4 rounded-2xl transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
                        title="Toggle Sort Order"
                    >
                        {sortOrder === 'desc' ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </button>
                </div>

                {/* Main Table Container */}
                <div className={`rounded-[3rem] border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className={`text-[11px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-slate-500 bg-slate-950/30' : 'text-slate-400 bg-slate-50/50'}`}>
                                    <th className="px-10 py-6">Customer Dossier</th>
                                    <th className="px-10 py-6">Intelligence & Contracts</th>
                                    <th className="px-10 py-6 text-center">Engagement</th>
                                    <th className="px-10 py-6 text-right">Operational Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {displayInquiries.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-10 py-32 text-center">
                                            <div className="max-w-xs mx-auto">
                                                <Search size={64} className="mx-auto mb-6 opacity-5" />
                                                <p className="font-black text-slate-400 uppercase tracking-widest text-xs mb-2">No Records Syncing</p>
                                                <p className="text-xs opacity-40 font-medium italic">Adjust your filters or try a different search term</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    displayInquiries.map((inquiry) => (
                                        <tr key={inquiry.id} className={`group transition-all ${inquiry.status === 'customer' ? 'bg-brand-primary/[0.03]' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'}`}>
                                            <td className="px-10 py-8 align-top">
                                                <div className="flex items-center gap-6 mb-6">
                                                    <div className={`h-14 w-14 rounded-3xl flex items-center justify-center font-black text-xl shadow-xl transition-transform group-hover:scale-110 ${inquiry.status === 'customer' ? 'bg-brand-primary text-white' : 'bg-white dark:bg-slate-800 text-brand-primary'}`}>
                                                        {inquiry.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-lg tracking-tighter mb-1 flex items-center gap-2">
                                                            {inquiry.name}
                                                            {inquiry.status === 'customer' && <Sparkles size={14} className="text-brand-primary animate-pulse" />}
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <a href={`mailto:${inquiry.email}`} className="text-xs font-bold opacity-40 hover:opacity-100 hover:text-brand-primary transition-all flex items-center gap-1.5">
                                                                <Mail size={12} /> {inquiry.email}
                                                            </a>
                                                            <a href={`tel:${inquiry.phone}`} className="text-xs font-bold opacity-40 hover:opacity-100 hover:text-brand-primary transition-all flex items-center gap-1.5">
                                                                <Phone size={12} /> {inquiry.phone}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100/30 dark:border-slate-800/30">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[9px] font-black opacity-30 uppercase tracking-widest">Received</span>
                                                        <p className="text-[10px] font-black opacity-60 uppercase">{DateTime.fromISO(inquiry.created_at).toFormat('LLL dd, yyyy • HH:mm')}</p>
                                                    </div>
                                                    {inquiry.updated_at && (
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest">Last Modified</span>
                                                            <p className="text-[10px] font-black text-brand-primary/60 uppercase">{DateTime.fromISO(inquiry.updated_at).toFormat('LLL dd, HH:mm')}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 align-top">
                                                <div className="max-w-lg">
                                                    {inquiry.status === 'customer' && (
                                                        <div className={`p-6 rounded-[2rem] mb-6 border-dashed border-2 animate-in slide-in-from-right duration-500 ${isDark ? 'bg-slate-950 border-brand-primary/20' : 'bg-white border-brand-primary/10 shadow-lg shadow-brand-primary/5'}`}>
                                                            <div className="flex items-center justify-between mb-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary"><FileText size={16} /></div>
                                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">Contractual Terms</span>
                                                                </div>
                                                                <div className="px-3 py-1 bg-brand-primary/10 rounded-lg text-[9px] font-black text-brand-primary uppercase">{inquiry.contract_length || 'Open Term'}</div>
                                                            </div>
                                                            <p className="text-xs font-bold leading-relaxed opacity-70 underline decoration-brand-primary/20 underline-offset-4">{inquiry.contract_details || 'Standard operational scope agreement.'}</p>
                                                        </div>
                                                    )}

                                                    <div className={`p-6 rounded-[2rem] mb-6 text-xs italic leading-relaxed border group-hover:shadow-md transition-all ${isDark ? 'bg-slate-950 border-slate-800 group-hover:border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                                                        <div className="flex items-center gap-2 mb-3 opacity-30">
                                                            <MessageSquare size={12} />
                                                            <span className="text-[9px] font-black uppercase tracking-widest">Initial Request</span>
                                                        </div>
                                                        "{inquiry.message}"
                                                    </div>

                                                    <div className="relative">
                                                        {editingNotes === inquiry.id ? (
                                                            <div className="space-y-3 animate-in fade-in duration-300">
                                                                <textarea
                                                                    autoFocus
                                                                    value={notesValue}
                                                                    onChange={(e) => setNotesValue(e.target.value)}
                                                                    className={`w-full p-6 rounded-[2rem] text-xs font-bold outline-none border-2 resize-none h-32 transition-all shadow-inner ${isDark ? 'bg-slate-950 border-brand-primary text-white' : 'bg-white border-brand-primary text-slate-900'}`}
                                                                    placeholder="Append internal intel..."
                                                                />
                                                                <div className="flex justify-end gap-3">
                                                                    <button onClick={() => setEditingNotes(null)} className="px-4 py-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Abort</button>
                                                                    <button onClick={() => saveNotes(inquiry.id)} className="px-6 py-2 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/30 flex items-center gap-2 hover:scale-105 transition-all"><Save size={14} /> Commit Note</button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                onClick={() => { setEditingNotes(inquiry.id); setNotesValue(inquiry.admin_notes || ''); }}
                                                                className={`p-6 rounded-[2rem] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center group/note-btn ${isDark ? 'border-slate-800 hover:border-brand-primary/30 hover:bg-slate-950/50' : 'border-slate-200 hover:border-brand-primary/20 hover:bg-brand-primary/[0.02]'}`}
                                                            >
                                                                {inquiry.admin_notes ? (
                                                                    <div className="w-full text-left">
                                                                        <div className="flex items-center gap-2 mb-3">
                                                                            <Sparkles size={12} className="text-brand-primary" />
                                                                            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Intelligence Notes</span>
                                                                        </div>
                                                                        <p className="text-xs font-black text-brand-primary line-clamp-3 leading-loose">{inquiry.admin_notes}</p>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex flex-col items-center gap-2 opacity-30 group-hover/note-btn:opacity-100 transition-opacity">
                                                                        <MoreVertical size={20} className="rotate-90" />
                                                                        <p className="text-[10px] font-black uppercase tracking-widest">Append Intelligence</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-center align-top">
                                                <div className={`mt-2 inline-flex items-center px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg ${inquiry.status === 'customer'
                                                    ? 'bg-brand-primary text-white shadow-brand-primary/40'
                                                    : inquiry.status === 'contacted'
                                                        ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                                                        : 'bg-amber-500 text-white shadow-amber-500/30'
                                                    }`}>
                                                    {inquiry.status === 'customer' ? <Sparkles size={14} className="mr-2" /> : inquiry.status === 'contacted' ? <CheckCircle size={14} className="mr-2" /> : <Clock size={14} className="mr-2" />}
                                                    {inquiry.status}
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-right align-top">
                                                <div className="flex flex-col gap-3 max-w-[200px] ml-auto">
                                                    {inquiry.status !== 'customer' ? (
                                                        <button
                                                            onClick={() => { setConvertingInquiry(inquiry); setContractLength(''); setContractDetails(''); }}
                                                            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all bg-brand-primary text-white hover:bg-brand-primary/90 shadow-xl shadow-brand-primary/25 hover:scale-[1.02] active:scale-95"
                                                        >
                                                            <Check size={16} /> Accept Contract
                                                        </button>
                                                    ) : (
                                                        <button disabled className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed">
                                                            <Sparkles size={16} /> Prime Account
                                                        </button>
                                                    )}

                                                    <div className="grid grid-cols-3 gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingInquiry(inquiry);
                                                                setEditForm({
                                                                    name: inquiry.name,
                                                                    email: inquiry.email,
                                                                    phone: inquiry.phone,
                                                                    message: inquiry.message,
                                                                    status: inquiry.status,
                                                                    admin_notes: inquiry.admin_notes || '',
                                                                    contract_length: inquiry.contract_length || '',
                                                                    contract_details: inquiry.contract_details || '',
                                                                    additional_terms: inquiry.additional_terms || ''
                                                                });
                                                            }}
                                                            className={`p-4 rounded-2xl transition-all hover:scale-105 ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                                                            title="Edit Records"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => downloadContract(inquiry)}
                                                            className={`p-4 rounded-2xl transition-all hover:scale-105 ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-brand-primary' : 'bg-slate-100 hover:bg-slate-200 text-brand-primary'}`}
                                                            title="Cloud PDF"
                                                        >
                                                            <Download size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => { setDeletingInquiry(inquiry); }}
                                                            className={`p-4 rounded-2xl transition-all hover:scale-105 ${isDark ? 'bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white' : 'bg-red-50 hover:bg-red-500 text-red-500 hover:text-white'}`}
                                                            title="Purge Record"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => toggleStatus(inquiry, inquiry.status === 'customer' ? 'pending' : undefined)}
                                                        className={`w-full py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700`}
                                                    >
                                                        {inquiry.status === 'customer' ? 'Reset Account' : 'Mark In-Progress'}
                                                    </button>

                                                    {inquiry.signed_contract_key ? (
                                                        <div className="flex flex-col gap-2">
                                                            <button
                                                                onClick={() => downloadSignedContract(inquiry)}
                                                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all"
                                                            >
                                                                <FileText size={12} /> View Signed Doc
                                                            </button>
                                                            <button
                                                                onClick={() => removeSignedContract(inquiry.id)}
                                                                className="w-full text-[8px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 hover:text-red-500 transition-all py-1"
                                                            >
                                                                Remove Document
                                                            </button>
                                                        </div>
                                                    ) : inquiry.status === 'customer' && (
                                                        <button
                                                            onClick={() => setUploadingFor(inquiry.id)}
                                                            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed ${isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'} text-[9px] font-black uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-all`}
                                                        >
                                                            <Share2 size={12} /> Attach Signed
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Editing Records Modal - COMPREHENSIVE VERSION */}
            {editingInquiry && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
                    <div className={`w-full max-w-4xl p-12 rounded-[4rem] border-2 shadow-2xl animate-in fade-in zoom-in-95 duration-500 overflow-y-auto max-h-[90vh] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-brand-primary text-white rounded-[1.5rem] shadow-xl shadow-brand-primary/30"><Settings size={24} /></div>
                                <div>
                                    <h2 className="text-3xl font-black tracking-tighter">System Data Editor</h2>
                                    <p className="text-sm opacity-50 font-bold">Full administrative control over this record</p>
                                </div>
                            </div>
                            <button onClick={() => setEditingInquiry(null)} className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all hover:rotate-90"><X size={28} /></button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {/* Core Contact Info */}
                            <div className="md:col-span-3">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-30 flex items-center gap-3">
                                    <User size={14} /> Core Identity Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 ml-4">Full Name</label>
                                        <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className={`w-full p-5 rounded-[2rem] text-sm font-bold border-2 outline-none focus:border-brand-primary transition-all ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`} />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 ml-4">Email Address</label>
                                        <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className={`w-full p-5 rounded-[2rem] text-sm font-bold border-2 outline-none focus:border-brand-primary transition-all ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`} />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 ml-4">Phone Number</label>
                                        <input type="text" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className={`w-full p-5 rounded-[2rem] text-sm font-bold border-2 outline-none focus:border-brand-primary transition-all ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`} />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 ml-4">Classification Status</label>
                                        <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                                            className={`w-full p-5 rounded-[2rem] text-sm font-bold border-2 outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                                            <option value="pending">Pending Review</option>
                                            <option value="contacted">Lead Contacted</option>
                                            <option value="customer">Active Customer</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Message & Notes */}
                            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-30 flex items-center gap-3">
                                        <MessageSquare size={14} /> Initial Inquiry Content
                                    </h3>
                                    <textarea value={editForm.message} onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                                        className={`w-full p-6 rounded-[2.5rem] text-sm font-bold border-2 outline-none focus:border-brand-primary transition-all h-48 resize-none ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`} />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-30 flex items-center gap-3">
                                        <Sparkles size={14} /> Internal Intelligence (Notes)
                                    </h3>
                                    <textarea value={editForm.admin_notes} onChange={(e) => setEditForm({ ...editForm, admin_notes: e.target.value })}
                                        className={`w-full p-6 rounded-[2.5rem] text-sm font-black text-brand-primary border-2 outline-none focus:border-brand-primary transition-all h-48 resize-none ${isDark ? 'bg-slate-950 border-brand-primary/30' : 'bg-brand-primary/[0.02] border-brand-primary/10'}`}
                                        placeholder="Add your internal strategy or comments here..." />
                                </div>
                            </div>

                            {/* Contract Terms (Only if Customer or if you want to pre-set them) */}
                            <div className="md:col-span-3">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-30 flex items-center gap-3">
                                    <FileText size={14} /> Service Terms & Deliverables
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-1">
                                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 ml-4">Agreement Duration</label>
                                        <input type="text" value={editForm.contract_length} onChange={(e) => setEditForm({ ...editForm, contract_length: e.target.value })}
                                            placeholder="e.g. 6 Months"
                                            className={`w-full p-5 rounded-[2rem] text-sm font-bold border-2 outline-none focus:border-brand-primary transition-all ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`} />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 ml-4">Project Operational Scope</label>
                                        <input type="text" value={editForm.contract_details} onChange={(e) => setEditForm({ ...editForm, contract_details: e.target.value })}
                                            className={`w-full p-5 rounded-[2rem] text-sm font-bold border-2 outline-none focus:border-brand-primary transition-all ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 ml-4">Special Clauses (Additional Terms)</label>
                                        <textarea value={editForm.additional_terms} onChange={(e) => setEditForm({ ...editForm, additional_terms: e.target.value })}
                                            placeholder="Warranties, SLAs, etc."
                                            className={`w-full p-5 rounded-[2rem] text-sm font-bold border-2 outline-none focus:border-brand-primary transition-all h-28 resize-none ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 ml-4">Secure Storage Key (System ID)</label>
                                        <input type="text" readOnly value={editingInquiry?.signed_contract_key || 'No document attached'}
                                            className={`w-full p-5 rounded-[2rem] text-[10px] font-mono opacity-40 border-2 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[9px] font-black uppercase tracking-widest mb-2 ml-4">Permanent Retrieval URL</label>
                                        <input type="text" readOnly value={editingInquiry?.signed_contract_url || 'N/A'}
                                            className={`w-full p-5 rounded-[2rem] text-[10px] font-mono opacity-40 border-2 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <button onClick={() => setEditingInquiry(null)} className={`flex-1 py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}>Discard Session</button>
                            <button onClick={updateInquiryDetails} className="flex-[2] py-6 bg-brand-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:scale-[1.03] active:scale-95 transition-all shadow-2xl shadow-brand-primary/40 flex items-center justify-center gap-4"><Check size={20} /> Synchronize Global Records</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingInquiry && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-red-950/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-lg p-12 bg-white dark:bg-slate-950 rounded-[4rem] border-4 border-red-500/20 shadow-2xl text-center">
                        <div className="h-24 w-24 bg-red-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-red-500/40 animate-bounce"><Trash2 size={48} /></div>
                        <h2 className="text-3xl font-black tracking-tighter mb-4">Purge Record?</h2>
                        <p className={`text-sm mb-12 font-bold leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>You are about to permanently erase <span className="text-red-500">{deletingInquiry.name}</span> from the central database. This action is irreversible.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setDeletingInquiry(null)} className="flex-1 py-5 rounded-3xl font-black uppercase tracking-widest text-xs bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 transition-all">Cancel</button>
                            <button onClick={deleteInquiry} className="flex-1 py-5 bg-red-500 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-red-600 shadow-xl shadow-red-500/30 transition-all">Confirm Purge</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Acceptance Modal Fragment */}
            {convertingInquiry && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
                    <div className={`w-full max-w-xl p-12 rounded-[3.5rem] border-2 shadow-2xl animate-in zoom-in-95 duration-500 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-5">
                                <div className="p-4 bg-emerald-500 text-white rounded-[1.5rem] shadow-xl shadow-emerald-500/30"><Sparkles size={28} /></div>
                                <div>
                                    <h2 className="text-3xl font-black tracking-tighter">Convert to Prime</h2>
                                    <p className="text-sm opacity-50 font-bold">Initiating project for {convertingInquiry.name}</p>
                                </div>
                            </div>
                            <button onClick={() => setConvertingInquiry(null)} className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"><X size={28} /></button>
                        </div>
                        <div className="space-y-8 mb-10">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-30">Contract Duration</label>
                                <input type="text" value={contractLength} onChange={(e) => setContractLength(e.target.value)} placeholder="e.g. 12 Month Retainer"
                                    className={`w-full p-6 rounded-[2rem] text-sm font-bold border-2 outline-none focus:border-brand-primary transition-all ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-30">Operational Details</label>
                                <textarea value={contractDetails} onChange={(e) => setContractDetails(e.target.value)} placeholder="Full-stack build, SEO optimization, etc."
                                    className={`w-full p-6 rounded-[2rem] text-sm font-bold border-2 outline-none focus:border-brand-primary transition-all h-32 resize-none ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-30">Special Clauses (Additional Terms)</label>
                                <textarea value={additionalTerms} onChange={(e) => setAdditionalTerms(e.target.value)} placeholder="Warranties, specific SLAs, or custom legal requirements..."
                                    className={`w-full p-6 rounded-[2rem] text-sm font-bold border-2 outline-none focus:border-brand-primary transition-all h-32 resize-none ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`} />
                            </div>
                        </div>
                        <button onClick={() => toggleStatus(convertingInquiry, 'customer')} className="w-full py-6 bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:scale-[1.03] active:scale-95 transition-all shadow-2xl shadow-emerald-500/40 flex items-center justify-center gap-4">
                            <CheckCircle size={20} /> Execute Service Agreement
                        </button>
                    </div>
                </div>
            )}

            {/* Upload Modal Segment */}
            {uploadingFor && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
                    <div className={`w-full max-w-md p-10 rounded-[3.5rem] border-2 shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black tracking-tighter">Attach Signed Doc</h2>
                            <button onClick={() => setUploadingFor(null)} className="p-2 hover:bg-slate-100 rounded-full transition-all"><X size={24} /></button>
                        </div>
                        <div className="space-y-6">
                            <div className="p-8 border-2 border-dashed border-slate-700 rounded-3xl text-center">
                                <FileText size={40} className="mx-auto mb-4 text-brand-primary opacity-40" />
                                <p className="text-xs font-bold opacity-30 mb-4">Select the scanned PDF agreement</p>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    id="contract-upload"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) uploadSignedContract(uploadingFor, file);
                                    }}
                                />
                                <label
                                    htmlFor="contract-upload"
                                    className="inline-block px-8 py-4 bg-brand-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:scale-105 active:scale-95 transition-all"
                                >
                                    Browse Records
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="fixed bottom-10 right-10 z-[200] bg-red-500 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom flex-row-reverse">
                    <button onClick={() => setError(null)} className="p-2 hover:bg-white/20 rounded-full transition-all"><X size={20} /></button>
                    <div className="h-2 w-2 rounded-full bg-white animate-ping" />
                    <p className="font-black uppercase tracking-widest text-[10px]">{error}</p>
                </div>
            )}
        </div>
    );
};
