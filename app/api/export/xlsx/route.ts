import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { buildXLSX } from '@/lib/export/xlsx-builder';
import { getTransactions, getDashboardMetrics } from '@/app/actions/transaction.actions';
import { createClient } from '@/lib/supabase/server';

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

    const wb = buildXLSX(transactions, metrics);
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=Laporan-Duitin.xlsx',
      },
    });
  } catch (error) {
    console.error('XLSX Export Error:', error);
    return NextResponse.json({ error: 'Failed to generate XLSX' }, { status: 500 });
  }
}
