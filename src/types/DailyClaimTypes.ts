
export interface DailyItem {
    day: number;
    points: string;
}

export interface DailyClaimData {
    today_claimed: boolean;
    current_day: number;
    next_points: string;
    time_left: string;
    daily_list: DailyItem[];
}

export interface DailyClaimResponse {
    status_code: number;
    status: boolean;
    message: string;
    data: DailyClaimData;
}
