export interface ProfileUser {
    id: string;
    full_name: string;
    email: string;
    user_image: string;
}

export interface ProfileTier {
    current_tier: string;
    total_points: number;
    current_tier_max: number;
    tier_progress_percent: number;
    next_tier: string;
    next_tier_points: number;
    points_needed: number;
    time_remaining: string;
    maintain_message: string;
}

export interface ProfileGoal {
    daily_step_goal: number;
    activity_level: string;
    weekly_goal: number;
}

export interface MonthlyStepsData {
    month: string;
    year: string;
    total_steps: number;
    daily_goal: number;
    goal_achieved_days: number;
    missed_days: number;
    daily_steps: { [date: string]: number };
}

export interface ProfileData {
    user: ProfileUser;
    tier: ProfileTier;
    goal: ProfileGoal;
    monthly_steps: MonthlyStepsData;
}

export interface ProfileApiResponse {
    status_code: number;
    status: boolean;
    message: string;
    data: ProfileData;
}

export interface UpdateUserImageResponse {
    user_image: string;
}
