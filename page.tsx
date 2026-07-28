'use client'

import { useEffect, useState } from 'react'
import {
  Building2,
  CalendarClock,
  CircleDollarSign,
  ContactRound,
  Home,
  Search,
  TrendingUp,
} from 'lucide-react'
import { getSupabaseClient } from '../lib/supabase'

const cards = [
  { label: 'Propiedades activas', value: '0', icon: Home },
  { label: 'Clientes en búsqueda', value: '0', icon: ContactRound },
  { label: 'Seguimientos pendientes', value: '0', icon: CalendarClock },
  { label: 'Comisión esperada', value: 'US$ 0', icon: CircleDollarSign },
]

type ConnectionStatus = 'checking' | 'connected' | 'error'

export default function Dashboard() {
  const [status, setStatus] = useState<ConnectionStatus>('checking')

  useEffect(() => {
    const verificarConexion = async () => {
      const supabase = getSupabaseClient()

      if (!supabase) {
        setStatus('error')
        return
      }

      try {
        const { error } = await supabase.auth.getSession()
        setStatus(error ? 'error' : 'connected')
      } catch (error) {
        console.error('Error al verificar Supabase:', error)
        setStatus('error')
      }
    }

    void verificarConexion()
  }, [])

  const statusText =
    status === 'checking'
      ? 'Verificando Supabase…'
      : status === 'connected'
        ? 'Supabase conectado'
        : 'Falta conectar Supabase'

  return (
    <main>
      <aside className="sidebar">
        <div className="brand">
          <Building2 size={28} />
          <div>
            <strong>GD</strong>
            <span>Real Estate Manager</span>
          </div>
        </div>

        <nav>
          <a className="active" href="/">
            <TrendingUp size={19} />Panel principal
          </a>
          <a href="#propiedades">
            <Home size={19} />Propiedades
          </a>
          <a href="/clientes">
            <ContactRound size={19} />Clientes
          </a>
          <a href="#busquedas">
            <Search size={19} />Búsquedas
          </a>
          <a href="#seguimientos">
            <CalendarClock size={19} />Seguimientos
          </a>
        </nav>
      </aside>

      <section className="content">
        <header>
          <div>
            <p className="eyebrow">CRM INMOBILIARIO</p>
            <h1>Panel principal</h1>
            <p>Control de propiedades, clientes, publicaciones y comisiones.</p>
          </div>
          <span className={`status ${status}`}>{statusText}</span>
        </header>

        <div className="cards">
          {cards.map(({ label, value, icon: Icon }) => (
            <article className="card" key={label}>
              <div className="icon">
                <Icon size={22} />
              </div>
              <p>{label}</p>
              <strong>{value}</strong>
            </article>
          ))}
        </div>

        <div className="grid">
          <article className="panel" id="propiedades">
            <div className="panel-title">
              <div>
                <h2>Propiedades recientes</h2>
                <p>Aún no hay propiedades registradas.</p>
              </div>
              <button type="button">+ Nueva propiedad</button>
            </div>
            <div className="empty">
              <Home size={42} />
              <h3>Empieza registrando tu primera propiedad</h3>
              <p>
                Luego podrás controlar precio por m², contrato, publicaciones y
                comisión esperada.
              </p>
            </div>
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
