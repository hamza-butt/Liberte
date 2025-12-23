export interface ReferralNodeData {
    id: string;
    name: string;
    status: "Active" | "Pending" | "Inactive";
    referralsCount?: number;
    earnings?: number;
    avatar?: any;
    children?: ReferralNodeData[];
}
