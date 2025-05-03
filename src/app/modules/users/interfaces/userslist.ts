import { UserItem } from "./userItem";

export interface Userslist {
    limit: number;
    skip: number;
    total: number;
    users: UserItem[];
}
