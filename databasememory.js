import { randomUUID} from "node:crypto"
import { serialize } from "node:v8"

export class databasememory{
    #videos = new Map()


    list(search){
        return Array.from(this.#videos.entries()).map((videosArray) =>{
            const id = videosArray[0]
            const data = videosArray[1]

            return {
                id,
                ...data,
            }
        })

        .filter(video => {
            if(search){
                return video.title.includes(search)
            }
            return true
            
        })
    }


    create(video){
        const videosId = randomUUID()

        this.#videos.set(videosId, video)
    }


    update(id, video){
        this.#videos.set(id, video)
    }

    delete(id){
        this.#videos.delete(id)
    }
}