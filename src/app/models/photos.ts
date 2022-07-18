export interface PhotosList{
    photos : Photos
    stat: string
}

export interface Photos{
    photo: Photo[]
    page: number
    pages: number
    perpage: number
    total: number
}

export interface Photo{
    farm: number
    has_comment: number
    id: string
    is_primary: number
    isfamily: number
    isfriend: number
    ispublic: number
    owner: string
    secret: string
    server: string
    title: string
    url_l: string
}