# 💰 DUITIN — AI-Powered Realtime Financial Tracking System
## Master Development Plan

---

## 🎯 Project Overview

**Duitin** adalah platform pencatatan keuangan personal berbasis web dengan AI agent pintar (Gemini API) yang dapat mengeksekusi aksi di dalam aplikasi, realtime updates, dan export laporan profesional. Vibe: **dark-mode-first, cyberpunk-precision, fintech-grade**.

---

## 🏗️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Frontend** | React 18, TypeScript |
| **Styling** | Tailwind CSS v4, shadcn/ui |
| **Charts** | Chart.js + react-chartjs-2 |
| **Backend / Auth / DB / Storage** | Insforge (BaaS) |
| **AI Agent** | Google Gemini API (gemini-2.0-flash) |
| **PDF Export** | @react-pdf/renderer |
| **XLSX Export** | SheetJS (xlsx) |
| **Deploy** | Vercel |
| **Realtime** | Insforge Realtime Subscriptions |

---

## 🔤 Typography System

```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?
  family=Space+Grotesk:wght@300;400;500;600;700&
  family=Syne:wght@400;500;600;700;800&
  family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&
  family=Noto+Sans+JP:wght@300;400;500;600;700&
  display=swap');
```

| Peran | Font | Weight | Catatan |
|---|---|---|---|
| **Hero / Display Heading** | `Syne` | 700–800 | Dashboard title, brand name |
| **Section Heading (H2–H3)** | `Space Grotesk` | 600–700 | Card headers, menu items |
| **Body Text (EN/Numbers)** | `Plus Jakarta Sans` | 400–500 | Deskripsi, input, tabel |
| **Data / Monospace Numbers** | `Space Grotesk` | 500 | Nominal uang, statistik |
| **Body Text (JP)** | `Noto Sans JP` | 400–500 | Fallback jika konten JP |

```css
:root {
  --font-display: 'Syne', sans-serif;
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Plus Jakarta Sans', 'Noto Sans JP', sans-serif;
  --font-mono: 'Space Grotesk', monospace;
}
```

---

## 🎨 Design System & Color Palette

### Dark Mode First (Default)
```css
:root {
  /* Background layers */
  --bg-base: #080B10;           /* Deepest dark - main bg */
  --bg-surface: #0D1117;        /* Card surfaces */
  --bg-elevated: #161B22;       /* Elevated elements */
  --bg-overlay: #1C2128;        /* Modals, dropdowns */

  /* Brand - Electric Teal / Cyan */
  --accent-primary: #00E5C3;    /* Primary CTA, highlights */
  --accent-secondary: #0090FF;  /* Secondary, links */
  --accent-danger: #FF3B5C;     /* Pengeluaran, warning */
  --accent-success: #00E5A0;    /* Pemasukan, success */
  --accent-warning: #FFB800;    /* Budget alert */
  --accent-purple: #7C3AED;     /* AI Agent highlight */

  /* Text */
  --text-primary: #E6EDF3;
  --text-secondary: #8B949E;
  --text-muted: #484F58;
  --text-inverse: #080B10;

  /* Borders */
  --border-default: rgba(48, 54, 61, 0.8);
  --border-accent: rgba(0, 229, 195, 0.3);
  --border-glow: rgba(0, 229, 195, 0.6);

  /* Gradients */
  --gradient-brand: linear-gradient(135deg, #00E5C3 0%, #0090FF 100%);
  --gradient-danger: linear-gradient(135deg, #FF3B5C 0%, #FF8C00 100%);
  --gradient-surface: linear-gradient(180deg, #161B22 0%, #0D1117 100%);

  /* Glow effects */
  --glow-primary: 0 0 20px rgba(0, 229, 195, 0.2);
  --glow-danger: 0 0 20px rgba(255, 59, 92, 0.2);
  --glow-ai: 0 0 30px rgba(124, 58, 237, 0.3);
}
```

### Light Mode (Toggle)
```css
[data-theme="light"] {
  --bg-base: #F0F4F8;
  --bg-surface: #FFFFFF;
  --bg-elevated: #E8EDF2;
  --accent-primary: #007A6B;
  --accent-secondary: #0062CC;
  --text-primary: #0D1117;
  --text-secondary: #4A5568;
  --border-default: rgba(0, 0, 0, 0.08);
}
```

---

## 🗂️ Project Structure

```
duitin/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Sidebar + navbar layout
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Dashboard utama
│   │   ├── laporan/
│   │   │   └── page.tsx            # Pencatatan & laporan
│   │   ├── transaksi/
│   │   │   └── page.tsx            # Daftar semua transaksi
│   │   ├── kategori/
│   │   │   └── page.tsx            # Manajemen kategori
│   │   ├── budget/
│   │   │   └── page.tsx            # Budget planner
│   │   └── settings/
│   │       └── page.tsx
│   ├── api/
│   │   ├── ai-agent/
│   │   │   └── route.ts            # Gemini AI agent endpoint
│   │   ├── export/
│   │   │   ├── pdf/
│   │   │   │   └── route.ts        # PDF export API
│   │   │   └── xlsx/
│   │   │       └── route.ts        # XLSX export API
│   │   └── transactions/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx                  # Root layout + providers
│   └── page.tsx                    # Landing / redirect
├── components/
│   ├── ui/                         # shadcn/ui components
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   ├── MobileNav.tsx
│   │   └── ThemeToggle.tsx
│   ├── dashboard/
│   │   ├── SummaryCards.tsx        # Total pemasukan/pengeluaran
│   │   ├── CashflowChart.tsx       # Line/area chart
│   │   ├── CategoryPieChart.tsx    # Pie/donut chart
│   │   ├── RecentTransactions.tsx
│   │   ├── BudgetProgress.tsx
│   │   └── RealtimeTicker.tsx      # Live transaction feed
│   ├── laporan/
│   │   ├── DateRangePicker.tsx     # Custom periode selector
│   │   ├── ReportTable.tsx
│   │   ├── ReportCharts.tsx
│   │   ├── ExportPDFButton.tsx
│   │   └── ExportXLSXButton.tsx
│   ├── transaksi/
│   │   ├── TransactionForm.tsx     # Add/edit form
│   │   ├── TransactionList.tsx
│   │   ├── TransactionFilters.tsx
│   │   └── TransactionCard.tsx
│   ├── ai-agent/
│   │   ├── AgentChat.tsx           # Floating AI chat interface
│   │   ├── AgentCommandBar.tsx     # Command palette (⌘K)
│   │   ├── AgentMessage.tsx
│   │   └── AgentToolCall.tsx       # Show agent actions
│   └── shared/
│       ├── CurrencyInput.tsx       # IDR formatted input
│       ├── LoadingSpinner.tsx
│       ├── EmptyState.tsx
│       └── AnimatedNumber.tsx
├── lib/
│   ├── insforge/
│   │   ├── client.ts               # Insforge client init
│   │   ├── auth.ts                 # Auth helpers
│   │   ├── db.ts                   # DB queries
│   │   ├── realtime.ts             # Realtime subscription
│   │   └── storage.ts              # File storage
│   ├── gemini/
│   │   ├── client.ts               # Gemini client
│   │   ├── agent.ts                # Agent logic + tools
│   │   └── tools/
│   │       ├── transaction-tools.ts
│   │       ├── report-tools.ts
│   │       ├── budget-tools.ts
│   │       └── navigation-tools.ts
│   ├── export/
│   │   ├── pdf-template.tsx        # @react-pdf/renderer template
│   │   └── xlsx-builder.ts         # SheetJS builder
│   ├── utils/
│   │   ├── currency.ts             # IDR formatter
│   │   ├── date.ts                 # Date helpers
│   │   └── chart-config.ts         # Chart.js defaults
│   └── hooks/
│       ├── useTransactions.ts
│       ├── useRealtime.ts
│       ├── useAIAgent.ts
│       └── useBudget.ts
├── types/
│   ├── transaction.ts
│   ├── budget.ts
│   ├── report.ts
│   └── agent.ts
├── public/
│   ├── fonts/                      # Self-hosted fonts (optional)
│   └── icons/
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── components.json                 # shadcn config
└── vercel.json
```

---

## 🖥️ Halaman & Fitur Detail

### 1. `/dashboard` — Dashboard Utama

**Layout**: Sidebar kiri (collapsible) + main content area

**Komponen**:
- **Header Bar**: Tanggal hari ini, greeting user, notifikasi bell, AI agent toggle
- **Summary Cards** (4 cards realtime):
  - 💰 Total Saldo (animasi counter)
  - 📈 Pemasukan Bulan Ini (hijau, trending arrow)
  - 📉 Pengeluaran Bulan Ini (merah)
  - 🎯 Budget Tersisa (progress bar mini)
- **Main Charts Row**:
  - `CashflowChart`: Area chart 30 hari terakhir (income vs expense), realtime update
  - `CategoryPieChart`: Donut chart pengeluaran per kategori
- **Bottom Row**:
  - `RecentTransactions`: 10 transaksi terakhir dengan realtime feed
  - `BudgetProgress`: Semua budget aktif dengan progress bars
  - `RealtimeTicker`: Live feed transaksi masuk (seperti stock ticker)

### 2. `/laporan` — Pencatatan & Laporan

**Fitur Utama**:
- **Date Range Picker** custom (preset: hari ini, 7 hari, 30 hari, bulan ini, kuartal, tahun, custom)
- **Filter multi-dimensi**: Kategori, tipe (in/out), jumlah min-max
- **Tabel laporan** dengan sorting, pagination, search
- **Charts laporan**:
  - Bar chart: Perbandingan pemasukan vs pengeluaran per periode
  - Line chart: Trend saldo
  - Pie chart: Distribusi kategori
  - Stacked bar: Kategori per bulan
- **Export Panel**:
  - 📄 **Export PDF**: Laporan lengkap dengan semua chart (rendered ke PNG lalu embed ke PDF), header Duitin, tabel transaksi detail, summary statistik
  - 📊 **Export XLSX**: Sheet 1 (Summary), Sheet 2 (Transaksi Detail), Sheet 3 (Per Kategori), Sheet 4 (Chart data), dengan styling cell dan warna

### 3. `/transaksi` — Manajemen Transaksi

- **Quick Add Form** (sticky top): Input cepat nominal + kategori + keterangan
- **Daftar Transaksi**: Infinite scroll, grouped by date
- **Filter Bar**: Tipe, kategori, tanggal range, jumlah
- **Bulk Actions**: Select multiple → delete / re-kategorisasi
- **Transaction Detail Modal**: Edit lengkap + attachment foto struk

### 4. `/kategori` — Kategori

- Grid view kategori dengan icon + warna custom
- CRUD kategori
- Statistik penggunaan per kategori
- Kategori default: Makan, Transport, Belanja, Tagihan, Hiburan, Tabungan, Investasi, dll

### 5. `/budget` — Budget Planner

- Set budget per kategori per periode
- Visual progress dengan color coding (hijau < 50%, kuning 50-80%, merah > 80%)
- Alert notifikasi saat mendekati/melebihi budget
- Analisis AI: rekomendasi budget berdasarkan history

### 6. `/settings` — Pengaturan

- Profil user
- Preferensi mata uang (default IDR)
- Tema (dark/light)
- Notifikasi
- Hapus data / export semua data
- Gemini API key management

---

## 🤖 AI Agent (Gemini) — Duitin AI

### Konsep
Floating chat widget (kanan bawah) + Command Palette (⌘K) yang bisa:
- Menjawab pertanyaan tentang keuangan user
- **Mengeksekusi aksi** di dalam app via function calling

### Agent Tools (Function Calling)

```typescript
// tools/transaction-tools.ts
const transactionTools = [
  {
    name: "add_transaction",
    description: "Tambah transaksi baru ke sistem",
    parameters: {
      amount: number,       // Nominal IDR
      type: "income" | "expense",
      category: string,
      description: string,
      date?: string
    }
  },
  {
    name: "get_transactions",
    description: "Ambil daftar transaksi dengan filter",
    parameters: {
      start_date?: string,
      end_date?: string,
      category?: string,
      type?: string,
      limit?: number
    }
  },
  {
    name: "delete_transaction",
    description: "Hapus transaksi berdasarkan ID",
    parameters: { id: string }
  },
  {
    name: "update_transaction",
    description: "Update transaksi yang ada",
    parameters: { id: string, ...Partial<Transaction> }
  }
]

// tools/report-tools.ts
const reportTools = [
  {
    name: "generate_report",
    description: "Buat laporan keuangan periode tertentu",
    parameters: { start_date: string, end_date: string, group_by?: string }
  },
  {
    name: "analyze_spending",
    description: "Analisis pola pengeluaran user",
    parameters: { period: "week" | "month" | "quarter" | "year" }
  },
  {
    name: "export_report",
    description: "Export laporan ke PDF atau XLSX",
    parameters: { format: "pdf" | "xlsx", start_date: string, end_date: string }
  }
]

// tools/navigation-tools.ts
const navigationTools = [
  {
    name: "navigate_to",
    description: "Navigasi ke halaman tertentu di app",
    parameters: { page: "dashboard" | "laporan" | "transaksi" | "budget" | "kategori" }
  },
  {
    name: "open_modal",
    description: "Buka modal tambah transaksi atau laporan",
    parameters: { modal: "add_transaction" | "budget_form" | "date_picker" }
  },
  {
    name: "apply_filter",
    description: "Terapkan filter ke halaman laporan aktif",
    parameters: { ...FilterParams }
  }
]

// tools/budget-tools.ts
const budgetTools = [
  {
    name: "set_budget",
    description: "Set budget untuk kategori tertentu",
    parameters: { category: string, amount: number, period: string }
  },
  {
    name: "get_budget_status",
    description: "Cek status semua budget aktif",
    parameters: {}
  }
]
```

### Contoh Interaksi AI

```
User: "berapa total pengeluaran gua bulan ini?"
AI: [calls get_transactions] → "Pengeluaran kamu bulan ini Rp 2.450.000, 
     terbesar di kategori Makan (Rp 890.000, 36%)"

User: "catat pengeluaran ojol 35rb tadi"
AI: [calls add_transaction({amount: 35000, type: "expense", 
     category: "Transport", description: "Ojek online"})]
     → "✅ Tercatat! Pengeluaran Rp 35.000 untuk Transport."

User: "bikinin laporan bulan ini terus export ke pdf"
AI: [calls generate_report, then export_report({format: "pdf"})]
     → "📄 Laporan Oktober 2025 sudah diexport!"

User: "buka halaman laporan dan filter minggu ini"
AI: [calls navigate_to({page: "laporan"}), apply_filter({period: "week"})]
     → "Sudah diarahkan ke halaman Laporan dengan filter minggu ini."
```

---

## 📄 Export PDF — Spesifikasi Detail

### Library: `@react-pdf/renderer`
```bash
npm install @react-pdf/renderer --save
```

### Struktur PDF Laporan

```
📄 Halaman 1: Cover
   ├── Logo Duitin (SVG)
   ├── Judul: "Laporan Keuangan"
   ├── Periode: "1 Oktober – 31 Oktober 2025"
   ├── Nama User
   └── Generated: timestamp

📄 Halaman 2: Ringkasan Eksekutif
   ├── Summary Box: Total Pemasukan, Pengeluaran, Net Balance
   ├── Chart 1: Area chart cashflow (PNG embed dari canvas)
   └── Chart 2: Donut chart distribusi kategori (PNG embed)

📄 Halaman 3+: Detail Transaksi
   ├── Tabel dengan kolom: No, Tanggal, Keterangan, Kategori, Tipe, Nominal
   ├── Row berwarna alternating
   ├── Subtotal per halaman
   └── Grand total di akhir

📄 Halaman Terakhir: Analisis per Kategori
   ├── Bar chart per kategori (PNG embed)
   ├── Tabel ringkasan: Kategori | Total | % dari pengeluaran | Avg/hari
   └── Footer: Duitin watermark + page numbers
```

### Chart-to-PNG untuk PDF
```typescript
// Konversi Chart.js canvas ke PNG base64 untuk embed di PDF
const chartToPNG = (chartRef: RefObject<ChartJS>): string => {
  return chartRef.current?.canvas.toDataURL('image/png', 1.0) ?? '';
};
```

---

## 📊 Export XLSX — Spesifikasi Detail

### Library: `SheetJS (xlsx)`
```bash
npm install xlsx
```

### Struktur File Excel

```
📊 Sheet 1: "Ringkasan"
   ├── Header dengan branding Duitin (merged cells, background color)
   ├── Periode laporan
   ├── Summary KPI: Pemasukan, Pengeluaran, Saldo, Jumlah Transaksi
   └── Mini tabel top 5 kategori terbesar

📊 Sheet 2: "Transaksi Detail"
   ├── Header row (bold, background #1C2128, text white)
   ├── Kolom: No | Tanggal | Keterangan | Kategori | Tipe | Nominal | Saldo Kumulatif
   ├── Cell styling: Merah untuk pengeluaran, Hijau untuk pemasukan
   ├── Auto-filter aktif
   └── Total row di bawah (bold, border top double)

📊 Sheet 3: "Per Kategori"
   ├── Pivot: Kategori vs Bulan
   ├── Total per kategori (kolom kanan)
   ├── Total per bulan (baris bawah)
   └── Conditional formatting: heat map intensity

📊 Sheet 4: "Data Chart"
   ├── Data mentah untuk chart: Date | Income | Expense | Balance
   ├── Data kategori: Category | Amount | Percentage
   └── (Excel dapat generate chart dari sheet ini)
```

---

## 🗃️ Database Schema (Insforge)

### Tables

```sql
-- Users (managed by Insforge Auth)
users
  id            uuid PRIMARY KEY
  email         text UNIQUE NOT NULL
  full_name     text
  avatar_url    text
  currency      text DEFAULT 'IDR'
  theme         text DEFAULT 'dark'
  gemini_api_key text (encrypted)
  created_at    timestamptz DEFAULT now()

-- Transactions
transactions
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid()
  user_id       uuid REFERENCES users(id) ON DELETE CASCADE
  type          text CHECK (type IN ('income', 'expense', 'transfer'))
  amount        bigint NOT NULL  -- dalam satuan sen/rupiah
  category_id   uuid REFERENCES categories(id)
  description   text
  date          date NOT NULL DEFAULT CURRENT_DATE
  attachment_url text
  created_by_ai boolean DEFAULT false
  ai_context    jsonb  -- context dari AI agent
  created_at    timestamptz DEFAULT now()
  updated_at    timestamptz DEFAULT now()

-- Categories
categories
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid()
  user_id       uuid REFERENCES users(id) ON DELETE CASCADE
  name          text NOT NULL
  icon          text  -- emoji atau icon name
  color         text  -- hex color
  type          text CHECK (type IN ('income', 'expense', 'both'))
  is_default    boolean DEFAULT false
  sort_order    int DEFAULT 0
  created_at    timestamptz DEFAULT now()

-- Budgets
budgets
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid()
  user_id       uuid REFERENCES users(id) ON DELETE CASCADE
  category_id   uuid REFERENCES categories(id)
  amount        bigint NOT NULL
  period        text CHECK (period IN ('weekly', 'monthly', 'yearly'))
  start_date    date NOT NULL
  end_date      date
  is_active     boolean DEFAULT true
  created_at    timestamptz DEFAULT now()

-- AI Agent Logs
ai_sessions
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid()
  user_id       uuid REFERENCES users(id) ON DELETE CASCADE
  messages      jsonb[]  -- conversation history
  actions_taken jsonb[]  -- tool calls executed
  created_at    timestamptz DEFAULT now()
```

### RLS Policies (Row Level Security)
```sql
-- Semua tabel: user hanya bisa akses data milik sendiri
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_own_transactions" ON transactions
  USING (auth.uid() = user_id);
-- (Ulangi untuk semua tabel)
```

---

## ⚡ Realtime Architecture

```typescript
// lib/insforge/realtime.ts
// Subscribe ke perubahan transaksi user secara realtime

const subscribeToTransactions = (
  userId: string,
  onInsert: (tx: Transaction) => void,
  onUpdate: (tx: Transaction) => void,
  onDelete: (id: string) => void
) => {
  return insforge
    .channel(`transactions:${userId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'transactions',
      filter: `user_id=eq.${userId}`
    }, payload => onInsert(payload.new as Transaction))
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'transactions',
      filter: `user_id=eq.${userId}`
    }, payload => onUpdate(payload.new as Transaction))
    .on('postgres_changes', {
      event: 'DELETE',
      schema: 'public',
      table: 'transactions',
      filter: `user_id=eq.${userId}`
    }, payload => onDelete(payload.old.id))
    .subscribe();
};
```

---

## 📱 Responsive Design Breakpoints

```
Mobile  : < 640px  → Bottom nav, single column, compact cards
Tablet  : 640–1024px → Sidebar mini (icons only), 2-column grid
Desktop : > 1024px → Full sidebar (expanded), 3-4 column grid
```

### Sidebar Behavior
- **Mobile**: Hidden, toggleable via hamburger → slide-in overlay
- **Tablet**: Collapsed (icon-only, 60px wide), hover to expand
- **Desktop**: Expanded (240px), collapsible via toggle button

---

## 🧩 Sidebar Menu Items

```
🏠  Dashboard         /dashboard
📝  Laporan           /laporan
💸  Transaksi         /transaksi
🏷️  Kategori          /kategori
🎯  Budget            /budget
─────────────────────
⚙️  Pengaturan        /settings
❓  Bantuan
─────────────────────
🤖  Duitin AI [badge] → toggle AI chat
```

---

## 🌐 Environment Variables

```env
# .env.local

# Insforge
NEXT_PUBLIC_INSFORGE_URL=https://xxx.insforge.io
NEXT_PUBLIC_INSFORGE_ANON_KEY=xxx
INSFORGE_SERVICE_ROLE_KEY=xxx  # server-side only

# Gemini AI
GEMINI_API_KEY=xxx  # server-side only (atau per-user dari DB)

# App
NEXT_PUBLIC_APP_URL=https://duitin.vercel.app
NEXT_PUBLIC_APP_NAME=Duitin
```

---

## 🚀 Setup & Development

### 1. Init Project
```bash
npx create-next-app@latest duitin \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
cd duitin
```

### 2. Install Dependencies
```bash
# UI & Styling
npx shadcn@latest init
npx shadcn@latest add button card input label select tabs dialog sheet badge avatar dropdown-menu command popover calendar date-range-picker

# Charts
npm install chart.js react-chartjs-2

# Insforge (BaaS SDK)
npm install @insforge/client

# AI
npm install @google/generative-ai

# Export
npm install @react-pdf/renderer --save
npm install xlsx

# Utilities
npm install date-fns
npm install clsx tailwind-merge
npm install framer-motion
npm install react-hot-toast
npm install zustand  # state management
```

### 3. Tailwind Config
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Noto Sans JP', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      colors: {
        brand: {
          primary: '#00E5C3',
          secondary: '#0090FF',
          danger: '#FF3B5C',
          success: '#00E5A0',
          warning: '#FFB800',
          ai: '#7C3AED',
        },
        dark: {
          base: '#080B10',
          surface: '#0D1117',
          elevated: '#161B22',
          overlay: '#1C2128',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'ticker': 'ticker 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'counter': 'counter 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 229, 195, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 229, 195, 0.5)' },
        }
      }
    }
  }
}
export default config
```

### 4. Vercel Deploy Setup
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 60
    }
  },
  "env": {
    "NEXT_PUBLIC_APP_URL": "@app_url"
  }
}
```

**Vercel Dashboard Setup**:
1. Connect GitHub repo
2. Add semua env vars di Settings > Environment Variables
3. Set domain: `duitin.vercel.app`
4. Enable Edge Runtime untuk API routes yang perlu performa tinggi

---

## 📋 Development Phases

### Phase 1 — Foundation (Week 1–2)
- [x] Setup project, dependencies, folder structure
- [x] Insforge client setup + auth (login/register/session)
- [x] Layout: Sidebar + Navbar + responsive breakpoints
- [x] Design system: CSS variables, Tailwind config, fonts
- [x] Database schema + RLS policies di Insforge
- [x] Basic routing semua halaman

### Phase 2 — Core Features (Week 3–4)
- [x] Transaksi CRUD (add, edit, delete, list)
- [x] Kategori CRUD + default categories seed
- [x] Dashboard: Summary cards + realtime subscription
- [x] Dashboard: Chart.js charts (cashflow + pie)
- [x] Laporan: Date picker + filter + tabel
- [x] Realtime ticker feed

### Phase 3 — AI Agent (Week 5)
- [x] Gemini API integration + function calling setup
- [x] AI tools: transaction, report, navigation, budget
- [x] AgentChat UI (floating widget)
- [x] Command palette (⌘K) dengan AI
- [x] AI action visualization (show tool calls in UI)

### Phase 4 — Export & Budget (Week 6)
- [x] Export PDF: template @react-pdf/renderer + chart PNG embed
- [x] Export XLSX: SheetJS multi-sheet dengan styling
- [x] Budget CRUD + progress tracking
- [x] Budget alerts (notifikasi)
- [x] AI budget recommendations

### Phase 5 — Polish & Deploy (Week 7)
- [x] Animasi & micro-interactions (Framer Motion)
- [x] Light/dark mode toggle + persistence
- [x] Loading states, skeleton screens, error boundaries
- [x] Mobile optimization + PWA manifest
- [x] Performance: React.memo, useMemo, lazy loading charts
- [x] Vercel deploy + custom domain
- [x] Final testing semua fitur

---

## 🎨 UI/UX Notes — Cyberpunk Precision Aesthetic

### Visual Language
- **Background texture**: Subtle dot-grid pattern via CSS `background-image: radial-gradient`
- **Cards**: Dark glass morphism dengan `backdrop-filter: blur(12px)`, border `1px solid rgba(255,255,255,0.08)`
- **Accent lines**: Thin teal/cyan horizontal line sebagai decorative element di headers
- **Numbers**: Monospace font (Space Grotesk), animasi counter saat nilai berubah
- **Charts**: Custom Chart.js theme dengan gradient fills, warna sesuai brand palette
- **AI Chat**: Purple-accented glassmorphism bubble, "thinking" pulse animation
- **Realtime feed**: Horizontal scrolling ticker di bottom dashboard, live badge pulse

### Motion Principles
- **Page load**: Staggered fade-in + slide-up untuk cards (150ms delay antar card)
- **Number changes**: Smooth animated counter (AnimatedNumber component)
- **Sidebar**: Spring animation collapse/expand
- **Chart updates**: Smooth data transition bawaan Chart.js
- **New transaction**: Highlight + flash animation di Recent Transactions
- **AI typing**: Typewriter effect untuk AI responses

### Anti-pattern yang Dihindari
- ❌ Purple gradient on white (terlalu generic)
- ❌ Rounded pill buttons everywhere
- ❌ Flat design tanpa depth
- ❌ System fonts
- ❌ Cookie-cutter card layout tanpa karakter
- ✅ Dark atmosphere dengan teal/cyan accent → distinctive fintech dark theme

---

## 📌 Key Dependencies Summary

```json
{
  "dependencies": {
    "next": "16.x",
    "react": "18.x",
    "react-dom": "18.x",
    "@insforge/client": "latest",
    "@google/generative-ai": "latest",
    "chart.js": "^4.x",
    "react-chartjs-2": "^5.x",
    "@react-pdf/renderer": "latest",
    "xlsx": "latest",
    "framer-motion": "^11.x",
    "date-fns": "^3.x",
    "zustand": "^4.x",
    "react-hot-toast": "^2.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  }
}
```

---

*Plan dibuat untuk Duitin v1.0 — AI-Powered Financial Tracker*
*Stack: Next.js 16 · Insforge · Gemini AI · Tailwind CSS · Chart.js · shadcn/ui · Vercel*
