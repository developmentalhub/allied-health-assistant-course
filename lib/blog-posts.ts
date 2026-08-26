import { feelingOutOfYourDepthInASession } from '@/content/blog/feeling-out-of-your-depth-in-a-session';

import { whyJustFollowTheTherapyPlanDoesntAlwaysWork } from '@/content/blog/why-just-follow-the-therapy-plan-doesnt-always-work';

import { howMuchShouldAnAhaChangeInASession } from '@/content/blog/how-much-should-an-aha-change-in-a-session';

import { whatShouldAnAhaTellTheTherapistAfterASession } from '@/content/blog/what-should-an-aha-tell-the-therapist-after-a-session';

import { whenThePlannedGoalIsNotWhatTheClientNeedsToday } from '@/content/blog/when-the-planned-goal-is-not-what-the-client-needs-today';

import { whenAClientIsNotEngagingInTherapy } from '@/content/blog/when-a-client-is-not-engaging-in-therapy';

import { feedbackBetweenAhasAndAhpsWithoutKnockingConfidence } from '@/content/blog/feedback-between-ahas-and-ahps-without-knocking-confidence';

import { whenProgressFeelsTooSlowInAlliedHealth } from '@/content/blog/when-progress-feels-too-slow-in-allied-health';

import { whenDifferentAlliedHealthProfessionalsGiveDifferentAdvice } from '@/content/blog/when-different-allied-health-professionals-give-different-advice';

import { regulatingThePersonRunningTheSession } from '@/content/blog/regulating-the-person-running-the-session';

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'list'; items: string[] };

export type BlogPost = {
  slug: string;

  title: string;

  excerpt: string;

  date: string;

  updatedDate?: string;

  readMinutes: number;

  tag: string;

  seoTitle?: string;

  seoDescription?: string;

  keywords?: string[];

  coverAlt: string;

  audioUrl?: string;

  audioTitle?: string;

  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  feelingOutOfYourDepthInASession,

  whyJustFollowTheTherapyPlanDoesntAlwaysWork,

  howMuchShouldAnAhaChangeInASession,

  whatShouldAnAhaTellTheTherapistAfterASession,

  whenThePlannedGoalIsNotWhatTheClientNeedsToday,

  whenAClientIsNotEngagingInTherapy,

  feedbackBetweenAhasAndAhpsWithoutKnockingConfidence,

  whenProgressFeelsTooSlowInAlliedHealth,

  whenDifferentAlliedHealthProfessionalsGiveDifferentAdvice,

  regulatingThePersonRunningTheSession,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}