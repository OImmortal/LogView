import { useState } from 'react';
import { CheckCircleIcon, ChevronDownIcon, DownloadIcon, InformationCircleIcon, PencilIcon, PlusIcon } from '@heroicons/react/solid';

function Main() {
  const [systems, setSystems] = useState(42);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      tier: 'Basic Monitoring',
      price: '$49',
      features: [
        '5 System Instances',
        '7-Day Log Retention',
        'Basic Alerting',
      ],
      current: false,
    },
    {
      name: 'Pro',
      tier: 'Performance Tier',
      price: '$199',
      features: [
        '25 System Instances',
        '30-Day Log Retention',
        'Advanced AI Anomalies',
        'Custom Dashboards',
      ],
      current: true,
      popular: true,
    },
    {
      name: 'Enterprise',
      tier: 'Infinite Scale',
      price: 'Custom',
      features: [
        'Unlimited Systems',
        '1-Year Log Archival',
        'Dedicated Account Manager',
      ],
      current: false,
    },
  ];

  const billingHistory = [
    { date: 'Sep 24, 2024', ref: '#INV-8829-01', amount: '$199.00', status: 'Paid' },
    { date: 'Aug 24, 2024', ref: '#INV-7741-99', amount: '$199.00', status: 'Paid' },
    { date: 'Jul 24, 2024', ref: '#INV-6612-44', amount: '$199.00', status: 'Failed' },
  ];

  const estimatedPrice = 349;

  return (
    <div className="bg-[#060e20] text-[#dee5ff] min-h-screen font-sans">
      <main className="max-w-7xl mx-auto py-24 px-8 min-h-screen space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">Subscription Management</h1>
              <span className="bg-[#006c49] text-[#e1ffec] px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">Active</span>
            </div>
            <div className="flex items-center gap-4 text-[#a3aac4]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">corporate_fare</span>
                <span className="text-sm font-medium">CNPJ: 12.345.678/0001-90</span>
              </div>
              <div className="w-px h-4 bg-[#40485d]/30"></div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#ffb148]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                <span className="text-sm font-bold text-[#ffb148]">Pro Member</span>
              </div>
            </div>
          </div>
          <div className="bg-[#0f1930] p-4 rounded-xl border border-[#40485d]/10 flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[#a3aac4] font-bold">Next Billing Cycle</p>
              <p className="text-lg font-bold text-[#a3a6ff]">October 24, 2024</p>
            </div>
            <div className="w-12 h-12 bg-[#a3a6ff]/10 rounded-full flex items-center justify-center text-[#a3a6ff]">
              <span className="material-symbols-outlined">event_repeat</span>
            </div>
          </div>
        </header>

        <section className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-xl font-bold text-indigo-100">Plan Selection</h2>
              <p className="text-sm text-[#a3aac4]">Adjust your infrastructure capacity in real-time.</p>
            </div>
            <div className="flex items-center gap-4 bg-[#091328] p-1 rounded-lg">
              <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-1.5 rounded-md text-xs font-bold ${billingCycle === 'monthly' ? 'bg-[#a3a6ff] text-black' : 'text-[#a3aac4] hover:text-white'}`}>Monthly</button>
              <button onClick={() => setBillingCycle('yearly')} className={`px-4 py-1.5 rounded-md text-xs font-bold ${billingCycle === 'yearly' ? 'bg-[#a3a6ff] text-black' : 'text-[#a3aac4] hover:text-white'}`}>Yearly (Save 20%)</button>
            </div>
          </div>

          <div className="bg-[#091328] p-8 rounded-2xl border border-[#40485d]/10">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#a3aac4]">System Instances (RN-01)</label>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">{systems}</span>
                    <span className="text-[#a3aac4] font-medium">Systems monitored</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#ffb148] uppercase tracking-tighter">Estimated Price</p>
                  <p className="text-3xl font-black text-white">${estimatedPrice}<span className="text-sm font-normal text-[#a3aac4]">/mo</span></p>
                </div>
              </div>
              <div className="relative w-full">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={systems}
                  onChange={(e) => setSystems(e.target.value)}
                  className="w-full h-2 bg-[#141f38] rounded-full appearance-none cursor-pointer"
                />
                 <div className="flex justify-between text-[10px] font-bold text-outline uppercase tracking-widest mt-2">
                    <span>1 System</span>
                    <span>50 Systems</span>
                    <span>100+ Systems</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className={`relative group bg-[#0f1930] p-8 rounded-2xl border transition-all duration-300 flex flex-col ${plan.current ? 'border-[#a3a6ff]/40 shadow-2xl shadow-[#a3a6ff]/10 md:-translate-y-4' : 'border-[#40485d]/5 hover:border-[#a3a6ff]/30'}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#a3a6ff] text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>}
                <div className="mb-6">
                  <span className={`text-xs font-bold uppercase tracking-widest ${plan.current ? 'text-[#a3a6ff]' : 'text-[#a3aac4]'}`}>{plan.tier}</span>
                  <h3 className="text-2xl font-bold mt-1 text-white">{plan.name}</h3>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-[#a3aac4]">/mo</span>}
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-3 text-sm ${plan.current ? 'text-white' : 'text-[#a3aac4]'}`}>
                      <CheckCircleIcon className="w-5 h-5 text-[#69f6b8]" /> {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${plan.current ? 'bg-gradient-to-br from-[#a3a6ff] to-[#6063ee] text-black shadow-lg shadow-[#a3a6ff]/20 hover:scale-[1.02] transition-transform py-4' : 'border border-[#40485d]/20 hover:bg-[#141f38]'}`}>
                  {plan.current ? 'Current Plan' : (plan.price === 'Custom' ? 'Contact Sales' : 'Select Plan')}
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-indigo-100">Billing History</h2>
              <button className="text-xs font-bold text-[#a3a6ff] hover:underline">Download All (PDF)</button>
            </div>
            <div className="bg-[#0f1930] rounded-2xl overflow-hidden border border-[#40485d]/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#141f38] text-[10px] uppercase tracking-widest text-[#a3aac4] font-bold">
                  <tr>
                    <th className="px-6 py-4">Transaction Date</th>
                    <th className="px-6 py-4">Reference</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#40485d]/10">
                  {billingHistory.map((item, index) => (
                    <tr key={index} className="hover:bg-[#141f38]/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{item.date}</td>
                      <td className="px-6 py-4 text-[#a3aac4]">{item.ref}</td>
                      <td className="px-6 py-4 font-bold text-white">{item.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 font-bold text-xs ${item.status === 'Paid' ? 'text-[#69f6b8]' : 'text-[#ff6e84]'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Paid' ? 'bg-[#69f6b8]' : 'bg-[#ff6e84]'}`}></span> {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-[#192540] rounded-lg transition-colors">
                          {item.status === 'Paid' ? <DownloadIcon className="w-5 h-5 text-[#a3aac4]" /> : <InformationCircleIcon className="w-5 h-5 text-[#a3aac4]" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-xl font-bold text-indigo-100">Payment Method</h2>
            <div className="bg-[#141f38] p-6 rounded-2xl border border-[#40485d]/10 space-y-6">
              <div className="relative h-44 w-full bg-gradient-to-br from-[#192540] to-[#091328] rounded-xl p-6 border border-[#40485d]/20 shadow-xl flex flex-col justify-between overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#a3a6ff]/5 rounded-full blur-3xl"></div>
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-white/80 text-4xl">contactless</span>
                  <img alt="Visa Logo" className="h-8 w-auto grayscale brightness-200 opacity-80" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium tracking-[0.2em] text-[#a3aac4]">CARDS ENDING IN</p>
                  <p className="text-xl font-black tracking-widest text-white">•••• •••• •••• 4242</p>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-[#a3aac4] uppercase font-bold">Expires</p>
                    <p className="text-sm font-bold text-white">12 / 26</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-[#40485d]/20 px-2 py-0.5 rounded">Primary</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#0f1930] rounded-lg border border-[#40485d]/5">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#a3aac4]">mail</span>
                    <div>
                      <p className="text-[10px] text-[#a3aac4] uppercase font-bold">Billing Email</p>
                      <p className="text-xs font-medium text-white">finance@logviewer-corp.io</p>
                    </div>
                  </div>
                  <button className="text-[#a3a6ff]">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                </div>
                <button className="w-full py-4 bg-[#192540] border border-[#40485d]/20 rounded-xl text-sm font-bold hover:bg-[#1f2b49] transition-all flex items-center justify-center gap-2 text-white">
                  <PlusIcon className="w-5 h-5" /> Update Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center border-t border-[#40485d]/15 bg-[#060e20] text-[10px] uppercase tracking-[0.1em]">
        <div className="text-slate-600 mb-6 md:mb-0">
            © 2024 LogViewer Systems Inc. Precision Engineering for Infrastructure.
        </div>
        <div className="flex gap-8">
            <a className="text-slate-600 hover:text-indigo-300 transition-opacity" href="#">Privacy Policy</a>
            <a className="text-slate-600 hover:text-indigo-300 transition-opacity" href="#">Terms of Service</a>
            <a className="text-slate-600 hover:text-indigo-300 transition-opacity" href="#">Security</a>
            <a className="text-slate-600 hover:text-indigo-300 transition-opacity" href="#">Status</a>
        </div>
      </footer>
    </div>
  );
}

export default Main;

