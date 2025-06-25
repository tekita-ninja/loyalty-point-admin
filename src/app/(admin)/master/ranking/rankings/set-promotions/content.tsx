'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useRanking } from "@/hooks/master/useRanking"
import { CheckPromotionItem, useRankingPromotions } from "@/hooks/master/useRankingPromotions"
import { useEffect, useState } from "react"
import dayjs from "dayjs";
import { DialogImageButton } from "./dialog/image"
import { useRouter } from "next/navigation"


export default function SetPromotionsContent({ rankingId }: { rankingId: string }) {
  const [ranking, setRanking] = useState<string>('')
  const [promotions, setPromotions] = useState<CheckPromotionItem[] | undefined>([])
  const { data, signRankingPromotions } = useRankingPromotions(rankingId)
  const { getDetail } = useRanking()     
  const router = useRouter()

  useEffect(() => {
    getDetail(rankingId).then((res) => {
        setRanking(res.data.name)
    })
  }, [rankingId, getDetail])

  useEffect(() => {
    if (data) {
      setPromotions(data)
    }

  }, [data])

  useEffect(() => {
  console.log('Promotions updated:', promotions);
}, [promotions]);

  async function handleSaveChanges() {
    const promotionsSelected = promotions?.filter(item => item.checked).map(i => i.id)
    if (promotionsSelected) {
      signRankingPromotions.mutate({
        rankingId: rankingId,
        promotionIds: promotionsSelected
      }, {
        onSuccess: () => {
            router.push('/master/ranking/rankings')
        }
      })
    }
    
  }

  return (

    <div className="pb-12">
      <div className="font-bold mb-2">Ranking: { ranking }</div>
      <div className="grid sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        { 
            promotions && promotions.map((item) => (
              <Card key={item.id} className="border p-3 rounded-lg">
                <div className="flex items-center space-x-2 border-b pb-2">
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={(e) => {
                      setPromotions((prev) => 
                        prev?.map(i => i.id === item.id ? { ...i, checked: !!e } : i)
                      )
                    }}
                    className="rounded"
                    id={item.id}
                  />
                  <Label className="font-bold text-base uppercase" htmlFor={item.id}>{item.title}</Label>
                </div>
                <div className="grid grid-rows-2">
                  <DialogImageButton urlPicture={item.urlPicture} name={item.title} />
                  <div>
                    <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground w-24">Subtitle</div>
                        <div>:</div>
                        <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground w-24">Description</div>
                        <div>:</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
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
                        <div className="text-sm text-muted-foreground w-24">Tampilkan</div>
                        <div>:</div>
                        <div className="text-sm text-muted-foreground">{item.isPush ? 'Ya' : 'Tidak'}</div>
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
