'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import dayjs from "dayjs";
import { DialogImageButton } from "./dialog/image"
import { useRouter } from "next/navigation"
import { useLocation } from "@/hooks/master/useLocation"
import { CheckRewardItem, useLocationRewards } from "@/hooks/master/useLocationRewards"


export default function SetRewardContent({ locationId }: { locationId: string }) {
  const [location, setLocations] = useState<string>('')
  const [rewards, setRewards] = useState<CheckRewardItem[] | undefined>([])
  const { data, signLocationRewards } = useLocationRewards(locationId)
  const { getDetail } = useLocation()     
  const router = useRouter()

  useEffect(() => {
    getDetail(locationId).then((res) => {
        setLocations(res.data.name)
    })
  }, [locationId, getDetail])

  useEffect(() => {
    if (data) {
      setRewards(data)
    }

  }, [data])

  useEffect(() => {
  console.log('Rewards updated:', rewards);
}, [rewards]);

  async function handleSaveChanges() {
    const rewardsSelected = rewards?.filter(item => item.checked).map(i => i.id)
    if (rewardsSelected) {
      signLocationRewards.mutate({
        locationId: locationId,
        rewardIds: rewardsSelected
      }, {
        onSuccess: () => {
            router.push('/master/reward/location')
        }
      })
    }
    
  }

  return (

    <div className="pb-12">
      <div className="font-bold mb-2">Location: { location }</div>
      <div className="grid sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        { 
            rewards && rewards.map((item) => (
              <Card key={item.id} className="border p-3 rounded-lg">
                <div className="flex items-center space-x-2 border-b pb-2">
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={(e) => {
                      setRewards((prev) => 
                        prev?.map(i => i.id === item.id ? { ...i, checked: !!e } : i)
                      )
                    }}
                    className="rounded"
                    id={item.id}
                  />
                    <Label className="font-bold text-base uppercase" htmlFor={item.id}>{item.name}</Label>
                </div>
                <div className="grid grid-rows-2">
                    <DialogImageButton urlPicture={item.urlPicture} name={item.name} />
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground w-24">Kategori</div>
                            <div>:</div>
                            <div className="text-sm text-muted-foreground">{item.category?.name}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground w-24">Points</div>
                            <div>:</div>
                            <div className="text-sm text-muted-foreground">{item.price}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground w-24">Start Date</div>
                            <div>:</div>
                            <div className="text-sm text-muted-foreground">{dayjs(item.startDate).format('DD/MM/YYYY')}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground w-24">End Date</div>
                            <div>:</div>
                            <div className="text-sm text-muted-foreground">{dayjs(item.endDate).format('DD/MM/YYYY')}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground w-24">Limited</div>
                            <div>:</div>
                            <div className="text-sm text-muted-foreground">{item.isLimited ? 'Ya' : 'Tidak'}</div>
                        </div>
                    </div>
                </div>
              </Card>
            ))
        }
      </div>
      <div className="fixed bottom-3 right-3">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>

    
  )
}
