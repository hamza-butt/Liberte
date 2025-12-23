export interface NetworkNode {
    id: string;
    full_name: string;
    referal_code: string;
    user_image: string;
    status: string;
    referral_count: number;
    children: NetworkNode[];
}

export interface ReferAndEarnData {
    user_id: number;
    referal_code: string;
    referral_link: string;
    total_referral_earn: number;
    direct_count: number;
    total_network_count: number;
    network_tree: NetworkNode[];
}
