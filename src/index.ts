interface Item<T> {
    name: T
    path: string
    rawPath?: string
    children?: Item<T>[]
}

type RawType = {
    fullPath: string
    fullRawPath: string
    relativePath: string
    relativeRawPath: string
}

function routex<T extends string>(list: Item<T>[]) {

    const raw = {} as Record<T, RawType>

    /** @description 重新组合路径 */
    {
        const analyzePath = (list: Item<T>[], name?: string) => {
            const {
                fullPath = "",
                fullRawPath = ""
            }: RawType = name ? raw[name] : {}
            list.forEach(item => {
                const {
                    name,
                    path,
                    rawPath = path,
                    children
                } = item
                raw[name] = {
                    fullPath: fullPath + path,
                    fullRawPath: fullRawPath + rawPath,
                    relativePath: path,
                    relativeRawPath: rawPath
                }
                if(children) {
                    analyzePath(children, name)
                }
            })
        }
        analyzePath(list)
    }

}

function keepHistory() {
    
}