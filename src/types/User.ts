export interface TierDetails {
    total_earn_points: number;
    current_tier: string;
    current_tier_max_points: number;
    next_tier: string;
    next_tier_max_points: number;
    points_needed_for_next_tier: number;
}

export interface User {
    id: string;
    full_name: string;
    country_code: string;
    phone_number: string;
    email: string;
    membership_card_number: string;
    card_points: string;
    referral_user_id: string;
    referal_code: string;
    user_image: string;
    status: string;
    create_on: string;
    tier_details: TierDetails;
}
