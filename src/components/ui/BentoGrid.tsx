import Image, { StaticImageData } from 'next/image'

import cn from '@/utils/cn'

const Skeleton = ({ children }) => (
  <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 rounded-xl border border-transparent bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black">
    {children}
  </div>
)

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  headerClassName,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  headerClassName?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: StaticImageData
  icon?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent bg-white p-4 transition duration-200 hover:bg-brand-100/50 hover:shadow-xl',
        className,
      )}
    >
      <Skeleton>
        <Image
          src={header}
          className={cn('object-cover grayscale group-hover/bento:grayscale-0', headerClassName)}
          width={1000}
          height={300}
          alt="services"
        />
      </Skeleton>
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="flex items-center gap-3">
          <div className="group-hover/bento:animate-pulse">{icon}</div>
          <div className="mb-2 mt-2 font-sans text-2xl font-bold text-brand-400">{title}</div>
        </div>
        <div className="font-sans text-lg font-normal text-neutral-600">{description}</div>
      </div>
    </div>
  )
}
