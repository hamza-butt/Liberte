import { Transaction } from '../components/digitalVault/TransactionItem';

export interface BalanceCardData {
    available_balance: number;
    total_km: number;
    total_calories: number;
    total_steps: number;
}

export interface StepTransaction {
    id: string;
    steps: number;
    kilometre: number;
    kcal: number;
    event_time: string;
    time_ago: string;
}

export interface DigitalVaultData {
    user_id: number;
    balance_card: BalanceCardData;
    recent_transactions: Transaction[];
    step_transactions: StepTransaction[];
}
