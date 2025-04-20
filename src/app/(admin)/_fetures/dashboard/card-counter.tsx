import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
type CardCounterProp = {
  title: string
  data: string
  icon?: string
  label?: string
  movementIndocator?: 'UP' | 'DOWN'
  movementCount?: number
}
export default function CardCounter(props: CardCounterProp) {
  return (
    <Card>
      <div className='p-3 md:p-4'>
        <div className="flex items-center gap-2">
          {props?.icon && (
            <div className='h-8 w-8 bg-primary/50 dark:bg-success/50 rounded-md flex items-center justify-center shrink-0'>
              <Icon icon={props.icon} />
            </div>
          )}
          <p className='font-semibold'>{props.title}</p>
        </div>
        <div className='pl-9 flex items-center mt-3'>
          <div className='flex-1'>
            <h2 className='text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-300'>{props.data}</h2>
          </div>
          {
            props?.movementIndocator && (
              <div className={cn(
                'shrink-0 py-1 px-3 rounded-md',
                props.movementIndocator === 'DOWN' ? 'bg-red-400/10 text-red-400' : 'bg-success/10 text-green-400 dark:text-success',
              )}>
                <div className='flex items-center gap-1.5'>
                  {props.movementIndocator === 'DOWN' ? (<Icon icon={'hugeicons:chart-down'} />) : (<Icon icon={'hugeicons:chart-up'} />)}
                  {
                    props.movementCount && (
                      <p className='text-xs font-bold'>
                        {props.movementCount}%
                      </p>
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </Card>
  )
}
