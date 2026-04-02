interface BadgeProps {
  label: string
  color: string
  bg: string
}

export default function Badge({ label, color, bg }: BadgeProps) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 500,
      color,
      background: bg,
      width: 'fit-content'
    }}>
      {label}
    </span>
  )
}
