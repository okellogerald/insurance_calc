import User from "@/models/user"
import { BaseState } from "@/state/base_state"

export interface SignUpState extends BaseState {
    user: User | null
}
