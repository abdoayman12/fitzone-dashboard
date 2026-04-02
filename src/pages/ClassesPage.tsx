import { MOCK_CLASSES, MOCK_TRAINERS } from '../constants/mockData'
import Avatar from '../components/common/Avatar'
import PageHeader from '../components/common/PageHeader'
import { MdAdd, MdAccessTime, MdPeople } from 'react-icons/md'

export default function ClassesPage() {
  const todayClasses = MOCK_CLASSES

  return (
    <div>
      <PageHeader
        title="Classes & Schedule"
        subtitle="Manage gym sessions and trainer assignments"
        action={
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--color-accent)', color: '#0D0F14',
            border: 'none', borderRadius: 8, padding: '9px 16px',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>
            <MdAdd size={16} /> Add Class
          </button>
        }
      />

      {/* Today's Classes */}
      <p style={{ color: 'var(--color-text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 12 }}>
        Today's Classes
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {todayClasses.map((cls) => {
          const spotsLeft = cls.capacity - cls.enrolled
          const fillPct = Math.round((cls.enrolled / cls.capacity) * 100)
          const timeLabel = new Date(cls.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          const endLabel  = new Date(cls.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

          return (
            <div key={cls.id} style={{
              background: '#10131A',
              border: '1px solid var(--color-border)',
              borderRadius: 12,
              padding: 18,
              borderTop: `3px solid ${cls.color}`,
            }}>
              {/* Name + category */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, margin: 0 }}>{cls.name}</p>
                  <span style={{ fontSize: 10, color: cls.color, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                    {cls.category}
                  </span>
                </div>
                <span style={{
                  fontSize: 11, padding: '3px 8px', borderRadius: 20,
                  background: spotsLeft === 0 ? 'rgba(248,113,113,0.1)' : 'rgba(74,222,128,0.1)',
                  color: spotsLeft === 0 ? 'var(--color-danger)' : 'var(--color-success)',
                  fontWeight: 500,
                }}>
                  {spotsLeft === 0 ? 'Full' : `${spotsLeft} spots`}
                </span>
              </div>

              {/* Trainer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Avatar name={cls.trainerName} color={cls.color} size={26} radius={6} />
                <span style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>{cls.trainerName}</span>
              </div>

              {/* Time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <MdAccessTime size={14} color="var(--color-text-muted)" />
                <span style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>{timeLabel} — {endLabel}</span>
              </div>

              {/* Capacity progress */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MdPeople size={13} color="var(--color-text-muted)" />
                    <span style={{ color: 'var(--color-text-muted)', fontSize: 11 }}>{cls.enrolled}/{cls.capacity}</span>
                  </div>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: 11 }}>{fillPct}%</span>
                </div>
                <div style={{ height: 4, background: 'var(--color-bg-hover)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${fillPct}%`, background: cls.color, borderRadius: 4 }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Trainers Section */}
      <p style={{ color: 'var(--color-text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 12 }}>
        Trainers
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {MOCK_TRAINERS.map((trainer) => {
          const trainerClasses = MOCK_CLASSES.filter(c => c.trainerId === trainer.id)
          return (
            <div key={trainer.id} style={{
              background: '#10131A',
              border: '1px solid var(--color-border)',
              borderRadius: 12,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              textAlign: 'center',
            }}>
              <Avatar name={trainer.name} color={trainer.avatarColor} size={44} radius={12} />
              <div>
                <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, margin: 0 }}>{trainer.name}</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 11, margin: '2px 0 0' }}>{trainer.specialty}</p>
              </div>
              <span style={{
                fontSize: 11, padding: '3px 10px', borderRadius: 20,
                background: 'rgba(232,255,71,0.08)', color: 'var(--color-accent)',
                border: '1px solid rgba(232,255,71,0.15)',
              }}>
                {trainerClasses.length} class{trainerClasses.length !== 1 ? 'es' : ''} today
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
