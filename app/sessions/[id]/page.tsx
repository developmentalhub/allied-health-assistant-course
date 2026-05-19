import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

interface SessionRow {
  id: string
  title: string
  description: string | null
  session_type: string | null
  scheduled_at: string | null
  duration_minutes: number | null
  max_participants: number | null
  price_cents: number | null
  profiles: {
    id: string
    full_name: string | null
    avatar_url: string | null
    bio: string | null
    role: string | null
  } | null
}

export default async function SessionDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sessions')
    .select(`
      *,
      profiles (
        id,
        full_name,
        avatar_url,
        bio,
        role
      )
    `)
    .eq('id', id)
    .single()

  if (error || !data) {
    console.error('Session fetch error:', error)
    return notFound()
  }

  const session = data as SessionRow
  const profile = session.profiles

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 24 }}>
        
          <a href="/sessions"
          style={{ color: '#6b7280', textDecoration: 'none', fontSize: 14 }}
        >
          ← Back to sessions
        </a>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          padding: 32,
        }}
      >
        {/* Session type badge */}
        <div style={{ marginBottom: 16 }}>
          <span
            style={{
              background: '#ede9fe',
              color: '#6d28d9',
              borderRadius: 999,
              padding: '4px 12px',
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'capitalize' as const,
            }}
          >
            {session.session_type ?? 'Session'}
          </span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#111827' }}>
          {session.title}
        </h1>

        <p style={{ color: '#6b7280', fontSize: 16, marginBottom: 24 }}>
          {session.description}
        </p>

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            flexWrap: 'wrap' as const,
            marginBottom: 32,
            paddingBottom: 24,
            borderBottom: '1px solid #f3f4f6',
          }}
        >
          {session.scheduled_at && (
            <div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>Date & time</div>
              <div style={{ fontWeight: 600, color: '#111827' }}>
                {new Date(session.scheduled_at).toLocaleString('en-AU', {
                  dateStyle: 'long' as const,
                  timeStyle: 'short' as const,
                })}
              </div>
            </div>
          )}

          {session.duration_minutes && (
            <div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>Duration</div>
              <div style={{ fontWeight: 600, color: '#111827' }}>
                {session.duration_minutes} minutes
              </div>
            </div>
          )}

          {session.max_participants && (
            <div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>Max families</div>
              <div style={{ fontWeight: 600, color: '#111827' }}>{session.max_participants}</div>
            </div>
          )}

          {session.price_cents != null && (
            <div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>Price</div>
              <div style={{ fontWeight: 700, color: '#111827', fontSize: 18 }}>
                ${(session.price_cents / 100).toFixed(0)}
              </div>
            </div>
          )}
        </div>

        {/* Facilitator */}
        {profile && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>Facilitated by</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name ?? ''}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    objectFit: 'cover' as const,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#e9d5ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: '#7c3aed',
                    fontSize: 18,
                  }}
                >
                  {profile.full_name?.[0] ?? '?'}
                </div>
              )}
              <div>
                <div style={{ fontWeight: 600, color: '#111827' }}>{profile.full_name}</div>
                {profile.bio && (
                  <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                    {profile.bio}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        
          <a href={`/checkout?session_id=${session.id}`}
          style={{
            display: 'inline-block',
            background: '#7c3aed',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          Book now — ${session.price_cents != null ? (session.price_cents / 100).toFixed(0) : '–'}
        </a>
      </div>
    </main>
  )
}