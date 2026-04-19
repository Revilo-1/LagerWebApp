import type { ChartConfig } from "@/components/ui/chart";

export const leadsChartData = [
  { date: "1-5", newLeads: 120, disqualified: 40 },
  { date: "6-10", newLeads: 95, disqualified: 30 },
  { date: "11-15", newLeads: 60, disqualified: 22 },
  { date: "16-20", newLeads: 100, disqualified: 35 },
  { date: "21-25", newLeads: 150, disqualified: 70 },
  { date: "26-30", newLeads: 110, disqualified: 60 },
];

export const leadsChartConfig = {
  newLeads: {
    label: "Nye leads",
    color: "var(--chart-1)",
  },
  disqualified: {
    label: "Diskvalificeret",
    color: "var(--chart-3)",
  },
  background: {
    color: "var(--primary)",
  },
} as ChartConfig;

export const proposalsChartData = [
  { date: "1-5", proposalsSent: 9 },
  { date: "6-10", proposalsSent: 16 },
  { date: "11-15", proposalsSent: 6 },
  { date: "16-20", proposalsSent: 18 },
  { date: "21-25", proposalsSent: 11 },
  { date: "26-30", proposalsSent: 14 },
];

export const proposalsChartConfig = {
  proposalsSent: {
    label: "Sendte tilbud",
    color: "var(--chart-1)",
  },
} as ChartConfig;

export const revenueChartData = [
  { month: "Jul 2024", revenue: 6700 },
  { month: "Aug 2024", revenue: 7100 },
  { month: "Sep 2024", revenue: 6850 },
  { month: "Oct 2024", revenue: 7500 },
  { month: "Nov 2024", revenue: 8000 },
  { month: "Dec 2024", revenue: 8300 },
  { month: "Jan 2025", revenue: 7900 },
  { month: "Feb 2025", revenue: 8400 },
  { month: "Mar 2025", revenue: 8950 },
  { month: "Apr 2025", revenue: 9700 },
  { month: "May 2025", revenue: 11200 },
  { month: "Jun 2025", revenue: 9500 },
];

export const revenueChartConfig = {
  revenue: {
    label: "Omsaetning",
    color: "var(--chart-1)",
  },
} as ChartConfig;

export const leadsBySourceChartData = [
  { source: "website", leads: 170, fill: "var(--color-website)" },
  { source: "referral", leads: 105, fill: "var(--color-referral)" },
  { source: "social", leads: 90, fill: "var(--color-social)" },
  { source: "cold", leads: 62, fill: "var(--color-cold)" },
  { source: "other", leads: 48, fill: "var(--color-other)" },
];

export const leadsBySourceChartConfig = {
  leads: {
    label: "Leads",
  },
  website: {
    label: "Hjemmeside",
    color: "var(--chart-1)",
  },
  referral: {
    label: "Henvisning",
    color: "var(--chart-2)",
  },
  social: {
    label: "Sociale medier",
    color: "var(--chart-3)",
  },
  cold: {
    label: "Kold outreach",
    color: "var(--chart-4)",
  },
  other: {
    label: "Andet",
    color: "var(--chart-5)",
  },
} as ChartConfig;

export const projectRevenueChartData = [
  { name: "MVP Development", actual: 82000, target: 90000 },
  { name: "Consultation", actual: 48000, target: 65000 },
  { name: "Framer Sites", actual: 34000, target: 45000 },
  { name: "DevOps Support", actual: 77000, target: 90000 },
  { name: "LLM Training", actual: 68000, target: 80000 },
  { name: "Product Launch", actual: 52000, target: 70000 },
].map((row) => ({
  ...row,
  remaining: Math.max(0, row.target - row.actual),
}));

export const projectRevenueChartConfig = {
  actual: {
    label: "Faktisk",
    color: "var(--chart-1)",
  },
  remaining: {
    label: "Resterende",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--primary-foreground)",
  },
} as ChartConfig;

export const salesPipelineChartData = [
  { stage: "Leads", value: 680, fill: "var(--chart-1)" },
  { stage: "Kvalificeret", value: 480, fill: "var(--chart-2)" },
  { stage: "Tilbud sendt", value: 210, fill: "var(--chart-3)" },
  { stage: "Forhandling", value: 120, fill: "var(--chart-4)" },
  { stage: "Vundet", value: 45, fill: "var(--chart-5)" },
];

export const salesPipelineChartConfig = {
  value: {
    label: "Leads",
    color: "var(--chart-1)",
  },
  stage: {
    label: "Fase",
  },
} as ChartConfig;

export const regionSalesData = [
  {
    region: "Nordamerika",
    sales: 37800,
    percentage: 31,
    growth: "-3.2%",
    isPositive: false,
  },
  {
    region: "Europa",
    sales: 40100,
    percentage: 34,
    growth: "+9.4%",
    isPositive: true,
  },
  {
    region: "Asien og Stillehavet",
    sales: 30950,
    percentage: 26,
    growth: "+12.8%",
    isPositive: true,
  },
  {
    region: "Latinamerika",
    sales: 12200,
    percentage: 7,
    growth: "-1.7%",
    isPositive: false,
  },
  {
    region: "Mellemoesten og Afrika",
    sales: 2450,
    percentage: 2,
    growth: "+6.0%",
    isPositive: true,
  },
];

export const actionItems = [
  {
    id: 1,
    title: "Send kickoff-dokumenter",
    desc: "Send onboarding-dokumenter og tidsplan",
    due: "Forfalder i dag",
    priority: "Hoj",
    priorityColor: "bg-red-100 text-red-700",
    checked: false,
  },
  {
    id: 2,
    title: "Demoopkald for SaaS-MVP",
    desc: "Book Zoom-opkald med kunde",
    due: "Forfalder i morgen",
    priority: "Mellem",
    priorityColor: "bg-yellow-100 text-yellow-700",
    checked: true,
  },
  {
    id: 3,
    title: "Opdater case",
    desc: "Tilfoej seneste LLM-projekt",
    due: "Forfalder denne uge",
    priority: "Lav",
    priorityColor: "bg-green-100 text-green-700",
    checked: false,
  },
];

export const recentLeadsData = [
  {
    id: "L-1012",
    name: "Guillermo Rauch",
    company: "Vercel",
    status: "Kvalificeret",
    source: "Hjemmeside",
    lastActivity: "for 30 min siden",
  },
  {
    id: "L-1018",
    name: "Nizzy",
    company: "Mail0",
    status: "Kvalificeret",
    source: "Hjemmeside",
    lastActivity: "for 35 min siden",
  },
  {
    id: "L-1005",
    name: "Sahaj",
    company: "Tweakcn",
    status: "Forhandling",
    source: "Hjemmeside",
    lastActivity: "for 1 time siden",
  },
  {
    id: "L-1001",
    name: "Shadcn",
    company: "Shadcn/ui",
    status: "Kvalificeret",
    source: "Hjemmeside",
    lastActivity: "for 2 timer siden",
  },
  {
    id: "L-1003",
    name: "Sam Altman",
    company: "OpenAI",
    status: "Tilbud sendt",
    source: "Sociale medier",
    lastActivity: "for 4 timer siden",
  },
  {
    id: "L-1008",
    name: "Michael Andreuzza",
    company: "Lexington Themes",
    status: "Kontaktet",
    source: "Sociale medier",
    lastActivity: "for 5 timer siden",
  },
  {
    id: "L-1016",
    name: "Skyleen",
    company: "Animate UI",
    status: "Tilbud sendt",
    source: "Henvisning",
    lastActivity: "for 7 timer siden",
  },
  {
    id: "L-1007",
    name: "Arham Khan",
    company: "Weblabs Studio",
    status: "Vundet",
    source: "Hjemmeside",
    lastActivity: "for 6 timer siden",
  },
  {
    id: "L-1011",
    name: "Sebastian Rindom",
    company: "Medusa",
    status: "Tilbud sendt",
    source: "Henvisning",
    lastActivity: "for 10 timer siden",
  },
  {
    id: "L-1014",
    name: "Fred K. Schott",
    company: "Astro",
    status: "Kontaktet",
    source: "Sociale medier",
    lastActivity: "for 12 timer siden",
  },
  {
    id: "L-1010",
    name: "Peer Richelsen",
    company: "Cal.com",
    status: "Ny",
    source: "Andet",
    lastActivity: "for 8 timer siden",
  },
  {
    id: "L-1002",
    name: "Ammar Khnz",
    company: "BE",
    status: "Kontaktet",
    source: "Henvisning",
    lastActivity: "for 1 dag siden",
  },
  {
    id: "L-1015",
    name: "Toby",
    company: "Shadcn UI Kit ",
    status: "Forhandling",
    source: "Andet",
    lastActivity: "for 2 dage siden",
  },
  {
    id: "L-1006",
    name: "David Haz",
    company: "React Bits",
    status: "Kvalificeret",
    source: "Henvisning",
    lastActivity: "for 2 dage siden",
  },
  {
    id: "L-1004",
    name: "Erşad",
    company: "Align UI",
    status: "Ny",
    source: "Kold outreach",
    lastActivity: "for 3 dage siden",
  },
];
