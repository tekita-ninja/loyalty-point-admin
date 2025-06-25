'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useRanking } from "@/hooks/master/useRanking"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckBeneftiItem, useRankingBenefit } from "@/hooks/master/useRankingBenefits"


export default function SetBenefitContent({ rankingId }: { rankingId: string }) {
  const [ranking, setRanking] = useState<string>('')
  const [ benefits, setBenefits ] = useState<CheckBeneftiItem[] | undefined>([])
  const { data, signRankingBenefits } = useRankingBenefit(rankingId)
  const { getDetail } = useRanking()     
  const router = useRouter()

  useEffect(() => {
    getDetail(rankingId).then((res) => {
        setRanking(res.data.name)
    })
  }, [rankingId, getDetail])

  useEffect(() => {
    if (data) {
      setBenefits(data)
    }

    console.log(data)

  }, [data])

  useEffect(() => {
  console.log('Benefits updated:', benefits);
}, [benefits]);

  async function handleSaveChanges() {
    const benefitsSelected = benefits?.filter(item => item.checked).map(i => i.id)
    if (benefitsSelected) {
      signRankingBenefits.mutate({
        rankingId: rankingId,
        benefitIds: benefitsSelected
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
            benefits && benefits.map((item) => (
              <Card key={item.id} className="border p-3 rounded-lg">
                <div className="flex items-center space-x-2 border-b pb-2">
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={(e) => {
                      setBenefits((prev) => 
                        prev?.map(i => i.id === item.id ? { ...i, checked: !!e } : i)
                      )
                    }}
                    className="rounded"
                    id={item.id}
                  />
                  <Label className="font-bold text-base uppercase" htmlFor={item.id}>{item.title}</Label>
                </div>
                <div>
                  <div className="flex items-center gap-2 my-5">
                    <div className="text-sm text-muted-foreground">{item.description}</div>
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
