import User from "@/models/user"
import { BaseState } from "@/state/base_state"

export interface LogInState extends BaseState {
    user: User | null,
}
