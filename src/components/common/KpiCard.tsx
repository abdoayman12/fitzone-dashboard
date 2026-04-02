import type { ReactNode } from 'react'

interface KpiCardProps {
  label: string
  value: string | number
  sub?: string
  subColor?: string
  icon?: ReactNode
  accentBorder?: boolean
  accentColor?: string
}

export default function KpiCard({
  label,
  value,
  sub,
  subColor = 'var(--color-text-muted)',
  icon,
  accentBorder = false,
  accentColor,
}: KpiCardProps) {
  return (
    <div style={{
      background: '#10131A',
      border: `1px solid ${accentBorder ? 'var(--color-accent)' : 'var(--color-border)'}`,
      borderRadius: 12,
      padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
          {label}
        </p>
        {icon && (
          <div style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}>{icon}</div>
        )}
      </div>
      <p style={{
        color: accentColor ?? (accentBorder ? 'var(--color-accent)' : '#fff'),
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: '-0.5px',
        margin: '0 0 6px',
      }}>
        {value}
      </p>
      {sub && (
        <p style={{ color: subColor, fontSize: 12, margin: 0 }}>{sub}</p>
      )}
    </div>
  )
}
