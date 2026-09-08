import { useState } from 'react';
import { mockProducts, mockDraws, mockBettingTypes } from '../data/mockData';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

type Step = 'product' | 'draw' | 'bettype' | 'number' | 'amount' | 'review' | 'receipt';

interface BetSlip {
  product: string;
  draw: string;
  bettingType: string;
  number: string;
  amount: number;
  rate: number;
}

export default function BettingInterface() {
  const [step, setStep] = useState<Step>('product');
  const [betSlip, setBetSlip] = useState<BetSlip>({ product: '', draw: '', bettingType: '', number: '', amount: 0, rate: 0 });
  const [receipt, setReceipt] = useState<{ txnId: string; timestamp: string } | null>(null);

  const openDraws = mockDraws.filter(d => d.status === 'OPEN');
  const availableProducts = mockProducts.filter(p => p.status === 'active');

  const selectProduct = (name: string) => {
    setBetSlip({ ...betSlip, product: name });
    setStep('draw');
  };

  const selectDraw = (name: string) => {
    setBetSlip({ ...betSlip, draw: name });
    setStep('bettype');
  };

  const selectBetType = (name: string, rate: number) => {
    setBetSlip({ ...betSlip, bettingType: name, rate });
    setStep('number');
  };

  const submitNumber = (num: string) => {
    setBetSlip({ ...betSlip, number: num });
    setStep('amount');
  };

  const submitAmount = (amt: number) => {
    setBetSlip({ ...betSlip, amount: amt });
    setStep('review');
  };

  const confirmBet = () => {
    const txnId = `TXN-${Date.now()}`;
    setReceipt({ txnId, timestamp: new Date().toISOString() });
    setStep('receipt');
  };

  const reset = () => {
    setStep('product');
    setBetSlip({ product: '', draw: '', bettingType: '', number: '', amount: 0, rate: 0 });
    setReceipt(null);
  };

  const stepIndex = ['product', 'draw', 'bettype', 'number', 'amount', 'review', 'receipt'].indexOf(step);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Place Your Bet</h1>
        <p className="text-sm text-gray-500">Simple, secure, and transparent</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-1">
        {['Product', 'Draw', 'Type', 'Number', 'Amount', 'Review'].map((label, i) => (
          <div key={label} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              i <= stepIndex ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {i < stepIndex ? <CheckCircle size={16} /> : i + 1}
            </div>
            {i < 5 && <div className={`w-6 h-0.5 ${i < stepIndex ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        {step === 'product' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Product</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectProduct(p.name)}
                  className="p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all text-left"
                >
                  <p className="font-semibold text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.description}</p>
                  <span className="text-xs text-emerald-600 mt-1 inline-block">Code: {p.code}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'draw' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Draw</h2>
            <div className="space-y-3">
              {openDraws.map((d) => (
                <button
                  key={d.id}
                  onClick={() => selectDraw(d.name)}
                  className="w-full p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all text-left flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{d.name}</p>
                    <p className="text-xs text-gray-500">Date: {d.drawDate}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-600">
                    <Clock size={14} />
                    <span>Open</span>
                  </div>
                </button>
              ))}
              {openDraws.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <AlertCircle size={32} className="mx-auto mb-2" />
                  <p>No draws currently open</p>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 'bettype' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Betting Type</h2>
            <div className="space-y-3">
              {mockBettingTypes.filter(bt => bt.status === 'active').map((bt) => {
                const rateProfile = { rate: 0.85 };
                return (
                  <button
                    key={bt.id}
                    onClick={() => selectBetType(bt.name, rateProfile.rate)}
                    className="w-full p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{bt.name}</p>
                        <p className="text-xs text-gray-500">Format: {bt.numberFormat}-digit | Min: ₱{bt.minAmount} | Max: ₱{bt.maxAmount.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-emerald-600">Rate: {(rateProfile.rate * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 'number' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Enter Your Number</h2>
            <p className="text-sm text-gray-500 mb-4">
              Betting on: <span className="font-medium text-gray-700">{betSlip.bettingType}</span>
            </p>
            <NumberInput format={betSlip.bettingType.includes('2-Digit') ? 2 : betSlip.bettingType.includes('3-Digit') ? 3 : 4} onSubmit={submitNumber} />
          </div>
        )}

        {step === 'amount' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Enter Amount</h2>
            <p className="text-sm text-gray-500 mb-4">
              Number: <span className="font-mono font-bold text-gray-700 text-lg">{betSlip.number}</span>
            </p>
            <AmountInput onSubmit={submitAmount} />
          </div>
        )}

        {step === 'review' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Review Your Bet</h2>
            <div className="bg-gray-50 rounded-xl p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Product</span>
                <span className="font-medium">{betSlip.product}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Draw</span>
                <span className="font-medium">{betSlip.draw}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Betting Type</span>
                <span className="font-medium">{betSlip.bettingType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Number</span>
                <span className="font-mono font-bold text-lg">{betSlip.number}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount</span>
                <span className="font-semibold text-lg">₱{betSlip.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Effective Rate</span>
                <span className="font-medium text-emerald-600">{(betSlip.rate * 100).toFixed(0)}%</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-sm">
                <span className="text-gray-500">Potential Payout</span>
                <span className="font-bold text-emerald-600 text-lg">₱{(betSlip.amount / betSlip.rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setStep('amount')} className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">
                Back
              </button>
              <button onClick={confirmBet} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-medium">
                Confirm Bet
              </button>
            </div>
          </div>
        )}

        {step === 'receipt' && receipt && (
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Bet Accepted!</h2>
            <p className="text-sm text-gray-500 mb-6">Your transaction has been recorded</p>
            <div className="bg-gray-50 rounded-xl p-5 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-mono font-medium">{receipt.txnId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Product</span>
                <span>{betSlip.product}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Draw</span>
                <span>{betSlip.draw}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Type</span>
                <span>{betSlip.bettingType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Number</span>
                <span className="font-mono font-bold">{betSlip.number}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount</span>
                <span className="font-semibold">₱{betSlip.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rate</span>
                <span>{(betSlip.rate * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Timestamp</span>
                <span className="text-xs">{new Date(receipt.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="text-emerald-600 font-medium">ACCEPTED</span>
              </div>
            </div>
            <button onClick={reset} className="mt-5 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-medium">
              Place Another Bet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function NumberInput({ format, onSubmit }: { format: number; onSubmit: (num: string) => void }) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, format);
    setValue(v);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={`Enter ${format}-digit number`}
        className="w-full text-center text-3xl font-mono font-bold py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none"
        maxLength={format}
      />
      <button
        onClick={() => value.length === format && onSubmit(value)}
        disabled={value.length !== format}
        className="w-full py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
      >
        Continue
      </button>
    </div>
  );
}

function AmountInput({ onSubmit }: { onSubmit: (amt: number) => void }) {
  const [value, setValue] = useState('');
  const presets = [100, 500, 1000, 2000, 5000];

  return (
    <div className="space-y-4">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter amount"
        className="w-full text-center text-2xl font-bold py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:outline-none"
        min={10}
      />
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setValue(p.toString())}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-emerald-50 hover:border-emerald-300"
          >
            ₱{p.toLocaleString()}
          </button>
        ))}
      </div>
      <button
        onClick={() => value && parseInt(value) >= 10 && onSubmit(parseInt(value))}
        disabled={!value || parseInt(value) < 10}
        className="w-full py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
      >
        Continue
      </button>
    </div>
  );
}
