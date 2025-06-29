export type TResponseDashboardOverview = {
    amountCustomer: number,
    amountUser: number,
    topRewards: 
      {
        id: string,
        name: string,
        urlPicture: string,
        price: number,
        category: {
          id: string,
          name: string
        },
        totalLikes: number
    }[],
    topRewardsName: string[],
    topRewardsLikes: number[]
}

export type TResponseOverview = {
        data: TResponseDashboardOverview,
        isLoading: boolean,
        error: any,
}