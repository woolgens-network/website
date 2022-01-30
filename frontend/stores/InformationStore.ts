import {makeAutoObservable, runInAction} from "mobx";
import {getDiscordWidget, getMinecraftServerData} from "../core/information";

class InformationStore {

    onlineDiscord = 0
    onlineMinecraft = 0
    onlineUsers: Record<string, string> = {}

    constructor() {
        makeAutoObservable(this)
        this.updateData().then(() => {
            return null
        })
    }

    async updateData() {
        const discordWidget = await getDiscordWidget()
        const minecraftData = await getMinecraftServerData(process.env.NEXT_PUBLIC_MINECRAFT_IP)

        runInAction(() => {
            this.onlineDiscord = discordWidget.presence_count
            this.onlineMinecraft = minecraftData ? minecraftData.data.players.online : 0
            this.onlineUsers = minecraftData ? minecraftData.data.players.uuid : {}
        })
    }

    isUserOnline(username: string): boolean {
        return !!this.onlineUsers[username]
    }
}

const informationStore = new InformationStore()
export default informationStore
