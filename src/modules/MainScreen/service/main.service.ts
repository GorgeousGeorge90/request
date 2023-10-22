
class MainService {
    private myHeaders:any = new Headers();

    constructor() {
        this.myHeaders.append("apikey", "trDw5I6JIx7sqcEuvT0CToqTVStGE7hL");
    }

    async getValidate(value:number) {
        try {
            const response = await fetch(`https://api.apilayer.com/number_verification/validate?number=${value}`, {
                method: 'GET',
                redirect: 'follow',
                headers: this.myHeaders
            })
            return response.json()
        } catch (error) {
            return error
        }
    }
}

export default new MainService()