// src/utils/saveTransaction.ts

export interface Transaction {
  userId: string;
  amount: number;
  type: 'deposit' | 'withdraw' | 'payment' | 'refund';
  timestamp: string;
  description?: string;
}

export const saveTransaction = async (transaction: Transaction): Promise<void> => {
  try {
    const existing = localStorage.getItem('transactions');
    const transactions: Transaction[] = existing ? JSON.parse(existing) : [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    console.log('Transaction saved:', transaction);
  } catch (error) {
    console.error('Error saving transaction:', error);
  }
};
