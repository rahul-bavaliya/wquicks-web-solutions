import { Hono } from 'hono'
import { Resend } from 'resend'

const admin = new Hono<{ Bindings: { DB: D1Database; CONTRACTS: R2Bucket; ADMIN_PASSWORD: string; ADMIN_EMAIL: string; RESEND_API_KEY: string } }>()

// Middleware: Check Admin Password
admin.use('/*', async (c, next) => {
    // Skip auth for forgot-password
    if (c.req.path === '/api/admin/forgot-password') return await next();

    const password = c.req.header('X-Admin-Password');

    if (!password || password !== c.env.ADMIN_PASSWORD) {
        return c.json({ success: false, message: 'Unauthorized Access' }, 401);
    }
    await next();
});

/**
 * Reusable helper to generate standard contract metadata
 */
const getContractMetadata = (id: string | number, name: string, dateStr?: string) => {
    const dt = dateStr ? new Date(dateStr) : new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fileDate = `${months[dt.getMonth()]}${String(dt.getDate()).padStart(2, '0')}`;
    const fileYear = dt.getFullYear();
    const safeName = String(name || 'Customer').replace(/\s+/g, '');

    const baseName = `WQ_Contract_#${id}_${safeName}_${fileYear}_${fileDate}`;
    return {
        key: `contracts/${baseName}.pdf`,
        filename: `${baseName}.pdf`
    };
};

// Forgot Password Flow
admin.post('/forgot-password', async (c) => {
    try {
        if (!c.env.RESEND_API_KEY) {
            return c.json({ success: false, message: 'Server configuration error: API Key missing' }, 500);
        }

        const resend = new Resend(c.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [c.env.ADMIN_EMAIL],
            subject: 'WQuicks Management Console: Password Recovery',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                    <h2 style="color: #3b82f6; margin-bottom: 24px;">Management Console Recovery</h2>
                    <p style="font-size: 16px; color: #475569; line-height: 1.5;">You requested a password recovery for the WQuicks Admin Dashboard.</p>
                    <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; margin: 24px 0; text-align: center;">
                        <p style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Your Admin Password</p>
                        <p style="font-size: 24px; font-weight: bold; color: #1e293b; letter-spacing: 0.05em;">${c.env.ADMIN_PASSWORD}</p>
                    </div>
                    <p style="font-size: 14px; color: #94a3b8;">If you did not request this, please ignore this email or secure your server environment.</p>
                    <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e2e8f0;" />
                    <p style="font-size: 12px; color: #cbd5e1;">&copy; 2025 WQuicks Web Solutions. All rights reserved.</p>
                </div>
            `
        });

        if (error) {
            return c.json({ success: false, message: `Email failed: ${error.message}` }, 500);
        }

        return c.json({
            success: true,
            message: `Your password has been sent to your registered email: ${c.env.ADMIN_EMAIL.replace(/(.{2})(.*)(?=@)/, '$1***')}`
        });
    } catch (error) {
        return c.json({ success: false, message: 'Recovery failed' }, 500);
    }
});

// Get all inquiries
admin.get('/contacts', async (c) => {
    try {
        const { results } = await c.env.DB.prepare(
            "SELECT * FROM contacts ORDER BY created_at DESC"
        ).all();

        return c.json({
            success: true,
            data: results
        });
    } catch (error) {
        return c.json({ success: false, message: 'Failed to fetch data' }, 500);
    }
});

// Update inquiry status
admin.post('/contacts/:id/status', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json() as any;
        const status = String(body.status);
        const contract_length = body.contract_length ? String(body.contract_length) : null;
        const contract_details = body.contract_details ? String(body.contract_details) : null;
        const additional_terms = body.additional_terms ? String(body.additional_terms) : null;

        const result = await c.env.DB.prepare(
            "UPDATE contacts SET status = ?, contract_length = ?, contract_details = ?, additional_terms = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).bind(status, contract_length, contract_details, additional_terms, id).run();

        if (result.success) {
            return c.json({ success: true });
        }
        return c.json({ success: false, message: 'Failed to update status' }, 500);
    } catch (error) {
        return c.json({ success: false, message: 'Update failed' }, 500);
    }
});

// Update inquiry notes helper
admin.post('/contacts/:id/notes', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json() as any;
        const notes = body.notes ? String(body.notes) : null;

        const result = await c.env.DB.prepare(
            "UPDATE contacts SET admin_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).bind(notes, id).run();

        if (result.success) {
            return c.json({ success: true, message: 'Notes updated' });
        } else {
            throw new Error('Database update failed');
        }
    } catch (error) {
        return c.json({ success: false, message: 'Update failed' }, 500);
    }
});

// Update inquiry details (Global Edit)
admin.put('/contacts/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json() as any;
        const name = String(body.name);
        const email = String(body.email);
        const phone = String(body.phone);
        const message = String(body.message);
        const status = String(body.status);
        const admin_notes = body.admin_notes ? String(body.admin_notes) : null;
        const contract_length = body.contract_length ? String(body.contract_length) : null;
        const contract_details = body.contract_details ? String(body.contract_details) : null;
        const additional_terms = body.additional_terms ? String(body.additional_terms) : null;

        const result = await c.env.DB.prepare(
            "UPDATE contacts SET name = ?, email = ?, phone = ?, message = ?, status = ?, admin_notes = ?, contract_length = ?, contract_details = ?, additional_terms = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).bind(name, email, phone, message, status, admin_notes, contract_length, contract_details, additional_terms, id).run();

        if (result.success) {
            return c.json({ success: true, message: 'Inquiry updated' });
        } else {
            throw new Error('Database update failed');
        }
    } catch (error) {
        return c.json({ success: false, message: 'Update failed' }, 500);
    }
});

// Delete inquiry
admin.delete('/contacts/:id/delete', async (c) => {
    try {
        const id = c.req.param('id');
        const result = await c.env.DB.prepare(
            "DELETE FROM contacts WHERE id = ?"
        ).bind(id).run();

        if (result.success) {
            return c.json({ success: true, message: 'Inquiry deleted' });
        } else {
            throw new Error('Database deletion failed');
        }
    } catch (error) {
        return c.json({ success: false, message: 'Delete failed' }, 500);
    }
});

// Upload Signed Contract to R2
admin.post('/contacts/:id/upload', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.parseBody();
        const file = body['file'] as any;

        if (!file || !(file instanceof File)) {
            return c.json({ success: false, message: 'No file uploaded' }, 400);
        }

        // Fetch name for pretty storage key
        const { results: nameResults } = await c.env.DB.prepare(
            "SELECT name FROM contacts WHERE id = ?"
        ).bind(id).all();

        const customerName = (nameResults?.[0] as any)?.name || 'Customer';
        const { key } = getContractMetadata(id, customerName);

        await c.env.CONTRACTS.put(key, await file.arrayBuffer(), {
            httpMetadata: { contentType: 'application/pdf' }
        });

        // Construct retrieval URL
        const url = new URL(c.req.url);
        const signedUrl = `${url.origin}/api/admin/contacts/${id}/download-signed`;

        const result = await c.env.DB.prepare(
            "UPDATE contacts SET signed_contract_key = ?, signed_contract_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).bind(key, signedUrl, id).run();

        if (result.success) return c.json({ success: true, key, url: signedUrl });

        return c.json({ success: false, message: 'Database sync failure' }, 500);
    } catch (error) {
        return c.json({ success: false, message: 'Upload stream failure' }, 500);
    }
});

// Download Signed Contract from R2
admin.get('/contacts/:id/download-signed', async (c) => {
    try {
        const id = c.req.param('id');
        const { results } = await c.env.DB.prepare(
            "SELECT name, signed_contract_key, created_at FROM contacts WHERE id = ?"
        ).bind(id).all();

        const row = results?.[0] as any;
        const key = row?.signed_contract_key;

        if (!key) return c.json({ success: false, message: 'No document record found' }, 404);

        const object = await c.env.CONTRACTS.get(key);
        if (!object) return c.json({ success: false, message: 'Storage object missing' }, 404);

        const { filename } = getContractMetadata(id, row.name, row.created_at);

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Content-Disposition', `attachment; filename="${filename.replace('.pdf', '_SIGNED.pdf')}"`);

        return new Response(object.body, { headers });
    } catch (error) {
        return c.json({ success: false, message: 'Secure stream failed' }, 500);
    }
});

// Delete Signed Contract from storage & DB
admin.delete('/contacts/:id/contract', async (c) => {
    try {
        const id = c.req.param('id');

        // 1. Get the key from DB
        const { results } = await c.env.DB.prepare(
            "SELECT signed_contract_key FROM contacts WHERE id = ?"
        ).bind(id).all();

        const key = (results?.[0]?.signed_contract_key ?? null) as string | null;

        // 2. Delete from R2 if key exists
        if (key) {
            await c.env.CONTRACTS.delete(key);
        }

        // 3. Clear fields in DB
        await c.env.DB.prepare(
            "UPDATE contacts SET signed_contract_key = NULL, signed_contract_url = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).bind(id).run();

        return c.json({ success: true, message: 'Contract removed' });
    } catch (error) {
        return c.json({ success: false, message: 'Failed to remove contract' }, 500);
    }
});

export default admin;
