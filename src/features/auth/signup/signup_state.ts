import { BaseState } from "@/state/base_state"
import { User } from "../models/user"

export interface SignUpState extends BaseState {
    user: User | null
}
