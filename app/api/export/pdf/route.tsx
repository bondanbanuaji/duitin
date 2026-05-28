import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { DuitinReport } from '@/lib/export/pdf-template';
import { getTransactions, getDashboardMetrics } from '@/app/actions/transaction.actions';
import { createClient } from '@/lib/supabase/server';
import React from 'react';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const transactions = await getTransactions(userId);
    const metrics = await getDashboardMetrics(userId);

    const buffer = await renderToBuffer(
      <DuitinReport
        userName={user.user_metadata?.full_name || "User Duitin"}
        period="Laporan Saat Ini"
        transactions={transactions}
        summary={metrics}
      />
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=Laporan-Duitin.pdf',
      },
    });
  } catch (error) {
    console.error('PDF Export Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
