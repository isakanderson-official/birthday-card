'use client'

import BirthdayCard from '@/components/BirthdayCard'
import { BIRTHDAY_CONFIG } from '@/config/birthday'

export default function Home() {
  return <BirthdayCard age={BIRTHDAY_CONFIG.age} />
}