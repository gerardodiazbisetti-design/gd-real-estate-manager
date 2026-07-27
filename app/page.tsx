'use client'

import { useEffect, useState } from 'react'
import { Building2, CalendarClock, CircleDollarSign, ContactRound, Home, Search, TrendingUp } from 'lucide-react'
import { createClient } from '../lib/supabase'

const cards = [
  { label: 'Propiedades activas', value: '0', icon: Home },
  { label: 'Clientes en búsqueda', value: '0', icon: ContactRound },
  { label: 'Seguimientos pendientes', value: '0', icon: CalendarClock },
  { label: 'Comisión esperada', value: 'US$ 0', icon: CircleDollarSign }
]

export default function Dashboard() {
  const [status, setStatus] = useState<'checking' | 'ok' | 'error'>('checking')

  useEffect(() => {
  const verificarConexion = async () => {
    try {
      const supabase = createClient()

      const { error } = await supabase.auth.getSession()

      if (error) {
        setStatus('error')
        return
      }

      setStatus('connected')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  verificarConexion()
}, [])

  return (
    <main>
      <aside className="sidebar">
        <div className="brand"><Building2 size={28}/><div><strong>GD</strong><span>Real Estate Manager</span></div></div>
        <nav>
          <a className="active"><TrendingUp size={19}/>Panel principal</a>
          <a><Home size={19}/>Propiedades</a>
          <a><ContactRound size={19}/>Clientes</a>
          <a><Search size={19}/>Búsquedas</a>
          <a><CalendarClock size={19}/>Seguimientos</a>
        </nav>
      </aside>

      <section className="content">
        <header>
          <div><p className="eyebrow">CRM INMOBILIARIO</p><h1>Panel principal</h1><p>Control de propiedades, clientes, publicaciones y comisiones.</p></div>
          <span className={`status ${status}`}>
            {status === 'checking' ? 'Verificando Supabase…' : status === 'ok' ? 'Supabase conectado' : 'Falta conectar Supabase'}
          </span>
        </header>

        <div className="cards">
          {cards.map(({ label, value, icon: Icon }) => (
            <article className="card" key={label}><div className="icon"><Icon size={22}/></div><p>{label}</p><strong>{value}</strong></article>
          ))}
        </div>

        <div className="grid">
          <article className="panel">
            <div className="panel-title"><div><h2>Propiedades recientes</h2><p>Aún no hay propiedades registradas.</p></div><button>+ Nueva propiedad</button></div>
            <div className="empty"><Home size={42}/><h3>Empieza registrando tu primera propiedad</h3><p>Luego podrás controlar precio por m², contrato, publicaciones y comisión esperada.</p></div>
          </article>

          <article className="panel compact">
            <h2>Próximos pasos</h2>
            <ol>
              <li><span>1</span>Conectar variables de Supabase</li>
              <li><span>2</span>Crear módulos y formularios</li>
              <li><span>3</span>Publicar la aplicación web</li>
              <li><span>4</span>Instalarla en Android</li>
            </ol>
          </article>
        </div>
      </section>
    </main>
  )
}
