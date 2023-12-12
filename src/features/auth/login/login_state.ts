import { BaseState } from "@/state/base_state"
import { User } from "../models/user";

export interface LogInState extends BaseState {
    user: User | null,
}
