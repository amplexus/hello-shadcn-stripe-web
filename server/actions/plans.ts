"use server"
import { SUBSCRIPTION_TIERS } from "@/data/plans"

export type PricingPlanType = typeof SUBSCRIPTION_TIERS[number]

export async function getPlans(): Promise<PricingPlanType[]> {
  return SUBSCRIPTION_TIERS
}

export async function getPlanByName(name: string): Promise<PricingPlanType | undefined> {
  return SUBSCRIPTION_TIERS.find((plan) => plan.plan === name)
}


