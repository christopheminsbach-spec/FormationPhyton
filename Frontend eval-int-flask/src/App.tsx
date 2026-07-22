import { useEffect, useMemo, useState } from 'react'
import type { FormEvent, ReactElement, ReactNode } from 'react'
import {
  ArrowRight,
  Check,
  Clapperboard,
  CloudMoon,
  Edit3,
  Film,
  Lightbulb,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
  Zap,
} from 'lucide-react'
import { createVehicle, deleteVehicle, getVehicles, isMockMode, updateVehicle } from './api'
import type { ParadeVehicle, VehicleFormValues, VehicleInput, VehicleStatus } from './types'
import { statusLabels } from './types'
import './App.css'

type ModalMode = 'create' | 'edit' | null
type StatusFilter = 'all' | VehicleStatus

const emptyForm = (): VehicleFormValues => ({
  name: '',
  universe: '',
  main_character: '',
  position: '',
  status: 'preparing',
  has_night_lighting: true,
  image_url: '',
  notes: '',
})

const vehicleToForm = (vehicle: ParadeVehicle): VehicleFormValues => ({
  name: vehicle.name,
  universe: vehicle.universe,
  main_character: vehicle.main_character,
  position: String(vehicle.position),
  status: vehicle.status,
  has_night_lighting: vehicle.has_night_lighting,
  image_url: vehicle.image_url ?? '',
  notes: vehicle.notes ?? '',
})

const formToVehicle = (values: VehicleFormValues): VehicleInput => ({
  name: values.name.trim(),
  universe: values.universe.trim(),
  main_character: values.main_character.trim(),
  position: Number(values.position),
  status: values.status,
  has_night_lighting: values.has_night_lighting,
  image_url: values.image_url.trim() || null,
  notes: values.notes.trim() || null,
})

const statusTone = (status: VehicleStatus): string => {
  if (status === 'ready') return 'status-ready'
  if (status === 'maintenance') return 'status-maintenance'
  return 'status-preparing'
}

const App = (): ReactElement => {
  const [vehicles, setVehicles] = useState<ParadeVehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [activeVehicle, setActiveVehicle] = useState<ParadeVehicle | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<ParadeVehicle | null>(null)
  const [formValues, setFormValues] = useState<VehicleFormValues>(emptyForm())
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [toast, setToast] = useState('')

  const loadVehicles = async (): Promise<void> => {
    try {
      setVehicles(await getVehicles())
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Impossible de charger les véhicules.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getVehicles()
      .then((loadedVehicles) => setVehicles(loadedVehicles))
      .catch((error: unknown) => setPageError(error instanceof Error ? error.message : 'Impossible de charger les véhicules.'))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (!toast) return
    const timeoutId = window.setTimeout(() => setToast(''), 3200)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  const visibleVehicles = useMemo(() => {
    const normalizedSearch = search.toLocaleLowerCase().trim()
    return vehicles.filter((vehicle) => {
      const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter
      const matchesSearch = !normalizedSearch || [vehicle.name, vehicle.universe, vehicle.main_character]
        .join(' ')
        .toLocaleLowerCase()
        .includes(normalizedSearch)
      return matchesStatus && matchesSearch
    })
  }, [search, statusFilter, vehicles])

  const readyCount = vehicles.filter((vehicle) => vehicle.status === 'ready').length
  const litCount = vehicles.filter((vehicle) => vehicle.has_night_lighting).length
  const maintenanceCount = vehicles.filter((vehicle) => vehicle.status === 'maintenance').length

  const openCreateModal = (): void => {
    setFormValues(emptyForm())
    setFormError('')
    setModalMode('create')
  }

  const openEditModal = (vehicle: ParadeVehicle): void => {
    setActiveVehicle(vehicle)
    setFormValues(vehicleToForm(vehicle))
    setFormError('')
    setModalMode('edit')
  }

  const closeFormModal = (): void => {
    if (!isSaving) setModalMode(null)
  }

  const handleFormChange = (field: keyof VehicleFormValues, value: string | boolean): void => {
    setFormValues((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const position = Number(formValues.position)
    if (!formValues.name.trim() || !formValues.universe.trim() || !formValues.main_character.trim()) {
      setFormError('Renseignez le nom, l’univers et le personnage principal.')
      return
    }
    if (!Number.isInteger(position) || position < 1) {
      setFormError('La position doit être un nombre entier supérieur à zéro.')
      return
    }

    setIsSaving(true)
    setFormError('')
    try {
      const input = formToVehicle(formValues)
      if (modalMode === 'edit' && activeVehicle) {
        await updateVehicle(activeVehicle.id, input)
        setToast('Véhicule mis à jour avec succès')
      } else {
        await createVehicle(input)
        setToast('Véhicule ajouté à la parade')
      }
      setModalMode(null)
      await loadVehicles()
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'L’enregistrement a échoué.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (): Promise<void> => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      await deleteVehicle(deleteTarget.id)
      setDeleteTarget(null)
      setToast('Véhicule retiré de la parade')
      await loadVehicles()
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'La suppression a échoué.')
      setDeleteTarget(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="disney-mark" aria-label="Dream Parade">
            <span>✦</span>
          </div>
          <div className="brand-divider" />
          <div>
            <p className="brand-title">DREAM PARADE</p>
            <p className="brand-subtitle">STUDIO CONSOLE</p>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Navigation principale">
          <p className="nav-label">WORKSPACE</p>
          <a className="nav-item nav-item-active" href="#vehicles">
            <Clapperboard size={18} />
            <span>Véhicules</span>
            <span className="nav-count">{vehicles.length}</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-status">
            <span className="online-dot" />
            <span>{isMockMode() ? 'Mode démo actif' : 'Backend connecté'}</span>
          </div>
          <div className="user-card">
            <div className="avatar">CD</div>
            <div>
              <p className="user-name">Camille Durand</p>
              <p className="user-role">Direction artistique</p>
            </div>
            <MoreHorizontal size={17} className="user-more" />
          </div>
        </div>
      </aside>

      <main className="main-content" id="vehicles">
        <header className="topbar">
          <button className="mobile-menu" type="button" aria-label="Ouvrir le menu"><Menu size={20} /></button>
          <div className="breadcrumbs"><span>Studio</span><ArrowRight size={13} /><strong>Véhicules</strong></div>
          <div className="topbar-actions">
            <span className="show-label">Saison 2026</span>
            <div className="top-avatar">CD</div>
          </div>
        </header>

        <div className="page-container">
          <section className="page-intro">
            <div>
              <p className="eyebrow"><Sparkles size={14} /> DISNEY DREAM PARADE <span>•</span> SAISON 2026</p>
              <h1>La parade prend vie.</h1>
              <p className="intro-copy">Orchestrez chaque véhicule, chaque univers et chaque détail de la magie.</p>
            </div>
            <button className="primary-button intro-button" type="button" onClick={openCreateModal}><Plus size={18} /> Ajouter un véhicule</button>
          </section>

          <section className="hero-banner" aria-label="Résumé de la parade">
            <div className="hero-glow" />
            <div className="hero-stars">✦ · ✧ · ✦</div>
            <div className="hero-content">
              <p className="hero-kicker">LA MAGIE COMMENCE ICI</p>
              <h2>Une nuit. <em>Un rêve.</em><br />Une parade inoubliable.</h2>
              <p>Préparez les véhicules du prochain grand spectacle nocturne de Disneyland Paris.</p>
              <a href="#vehicles">Explorer la composition <ArrowRight size={16} /></a>
            </div>
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-sparkle sparkle-one">✦</div>
            <div className="hero-sparkle sparkle-two">✧</div>
          </section>

          <section className="metrics-grid" aria-label="Indicateurs de la parade">
            <MetricCard label="VÉHICULES PLANIFIÉS" value={vehicles.length} detail="dans la composition" icon={<Film size={20} />} accent="blue" />
            <MetricCard label="PRÊTS POUR LE SHOW" value={readyCount} detail={vehicles.length ? `${Math.round((readyCount / vehicles.length) * 100)}% de la flotte` : 'en attente'} icon={<Check size={20} />} accent="gold" />
            <MetricCard label="ÉCLAIRAGE NOCTURNE" value={litCount} detail="véhicules équipés" icon={<CloudMoon size={20} />} accent="purple" />
            <MetricCard label="À SURVEILLER" value={maintenanceCount} detail="intervention requise" icon={<Zap size={20} />} accent="coral" />
          </section>

          <section className="vehicles-section">
            <div className="section-heading">
              <div>
                <h2>Composition de la parade</h2>
                <p>Les véhicules sont affichés dans leur ordre de passage.</p>
              </div>
            </div>

            <div className="toolbar">
              <label className="search-field">
                <Search size={17} />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher un véhicule..." aria-label="Rechercher un véhicule" />
                {search && <button type="button" onClick={() => setSearch('')} aria-label="Effacer la recherche"><X size={15} /></button>}
              </label>
              <div className="filter-group" aria-label="Filtrer par statut">
                <FilterButton active={statusFilter === 'all'} label="Tous" onClick={() => setStatusFilter('all')} />
                <FilterButton active={statusFilter === 'ready'} label="Prêts" onClick={() => setStatusFilter('ready')} />
                <FilterButton active={statusFilter === 'preparing'} label="En préparation" onClick={() => setStatusFilter('preparing')} />
                <FilterButton active={statusFilter === 'maintenance'} label="Maintenance" onClick={() => setStatusFilter('maintenance')} />
              </div>
            </div>

            {pageError && <div className="error-banner" role="alert">{pageError}<button type="button" onClick={() => { setIsLoading(true); setPageError(''); loadVehicles().catch(() => undefined) }}>Réessayer</button></div>}
            {isLoading ? <LoadingState /> : visibleVehicles.length ? (
              <div className="vehicle-list">
                {visibleVehicles.map((vehicle) => <VehicleRow key={vehicle.id} vehicle={vehicle} onEdit={openEditModal} onDelete={setDeleteTarget} />)}
              </div>
            ) : <EmptyState hasSearch={Boolean(search || statusFilter !== 'all')} onReset={() => { setSearch(''); setStatusFilter('all') }} onCreate={openCreateModal} />}
          </section>

          <footer className="page-footer"><span>© 2026 The Walt Disney Company</span><span className="footer-dot" /><span>Dream Parade Studio Console</span><span className="footer-right">v1.0.0 <span className="footer-dot" /> <span className="secure-label"><span /> Sécurisé</span></span></footer>
        </div>
      </main>

      {modalMode && <VehicleModal mode={modalMode} values={formValues} error={formError} saving={isSaving} onChange={handleFormChange} onSubmit={handleSubmit} onClose={closeFormModal} />}
      {deleteTarget && <DeleteModal vehicle={deleteTarget} deleting={isDeleting} onDelete={handleDelete} onClose={() => setDeleteTarget(null)} />}
      {toast && <div className="toast" role="status"><Check size={17} /> {toast}</div>}
    </div>
  )
}

type MetricCardProps = { label: string; value: number; detail: string; icon: ReactNode; accent: string }

const MetricCard = ({ label, value, detail, icon, accent }: MetricCardProps): ReactElement => (
  <div className={`metric-card metric-${accent}`}><div className="metric-icon">{icon}</div><div><p>{label}</p><strong>{value}</strong><span>{detail}</span></div></div>
)

type FilterButtonProps = { active: boolean; label: string; onClick: () => void }

const FilterButton = ({ active, label, onClick }: FilterButtonProps): ReactElement => (
  <button className={`filter-button ${active ? 'filter-active' : ''}`} type="button" onClick={onClick}>{label}</button>
)

type VehicleRowProps = { vehicle: ParadeVehicle; onEdit: (vehicle: ParadeVehicle) => void; onDelete: (vehicle: ParadeVehicle) => void }

const VehicleRow = ({ vehicle, onEdit, onDelete }: VehicleRowProps): ReactElement => (
  <article className="vehicle-row">
    <div className="position-marker"><span>{String(vehicle.position).padStart(2, '0')}</span><div className="position-line" /></div>
    <div className="vehicle-thumb">{vehicle.image_url ? <img src={vehicle.image_url} alt="" /> : <div className="thumb-placeholder"><Sparkles size={25} /></div>}<span className="thumb-star">✦</span></div>
    <div className="vehicle-info"><div className="vehicle-name-row"><h3>{vehicle.name}</h3><span className={`status-badge ${statusTone(vehicle.status)}`}><span /> {statusLabels[vehicle.status]}</span></div><p className="vehicle-meta"><span>{vehicle.universe}</span><i /> <span>{vehicle.main_character}</span></p>{vehicle.notes && <p className="vehicle-notes">{vehicle.notes}</p>}</div>
    <div className="vehicle-lighting">{vehicle.has_night_lighting ? <><span className="lighting-icon"><Lightbulb size={17} /></span><span>Éclairage<br />nocturne</span></> : <><span className="lighting-icon lighting-off"><CloudMoon size={17} /></span><span className="muted">Sans éclairage<br />nocturne</span></>}</div>
    <div className="vehicle-actions"><button className="icon-action" type="button" title="Modifier le véhicule" aria-label={`Modifier ${vehicle.name}`} onClick={() => onEdit(vehicle)}><Edit3 size={17} /></button><button className="icon-action action-delete" type="button" title="Supprimer le véhicule" aria-label={`Supprimer ${vehicle.name}`} onClick={() => onDelete(vehicle)}><Trash2 size={17} /></button></div>
  </article>
)

const LoadingState = (): ReactElement => <div className="loading-state"><div className="spinner" /><span>Chargement de la composition...</span></div>

type EmptyStateProps = { hasSearch: boolean; onReset: () => void; onCreate: () => void }

const EmptyState = ({ hasSearch, onReset, onCreate }: EmptyStateProps): ReactElement => <div className="empty-state"><div className="empty-icon"><Search size={25} /></div><h3>{hasSearch ? 'Aucun véhicule trouvé' : 'La parade est encore vide'}</h3><p>{hasSearch ? 'Essayez un autre terme ou réinitialisez les filtres.' : 'Commencez à composer votre prochain rêve Disney.'}</p><button className="secondary-button" type="button" onClick={hasSearch ? onReset : onCreate}>{hasSearch ? 'Réinitialiser les filtres' : 'Ajouter le premier véhicule'}</button></div>

type VehicleModalProps = { mode: Exclude<ModalMode, null>; values: VehicleFormValues; error: string; saving: boolean; onChange: (field: keyof VehicleFormValues, value: string | boolean) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>; onClose: () => void }

const VehicleModal = ({ mode, values, error, saving, onChange, onSubmit, onClose }: VehicleModalProps): ReactElement => (
  <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="vehicle-modal-title">
      <div className="modal-header"><div><p className="modal-eyebrow">DREAM PARADE STUDIO</p><h2 id="vehicle-modal-title">{mode === 'create' ? 'Ajouter un véhicule' : 'Modifier le véhicule'}</h2><p>{mode === 'create' ? 'Donnez vie à un nouvel univers Disney.' : 'Mettez à jour les détails de ce véhicule.'}</p></div><button className="modal-close" type="button" onClick={onClose} aria-label="Fermer"><X size={20} /></button></div>
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <Field label="Nom du véhicule" required><input value={values.name} onChange={(event) => onChange('name', event.target.value)} placeholder="Ex. Le voyage de Nemo" autoFocus /></Field>
          <Field label="Univers Disney" required><input value={values.universe} onChange={(event) => onChange('universe', event.target.value)} placeholder="Ex. Le Monde de Nemo" /></Field>
          <Field label="Personnage principal" required><input value={values.main_character} onChange={(event) => onChange('main_character', event.target.value)} placeholder="Ex. Nemo" /></Field>
          <Field label="Position dans la parade" required><input type="number" min="1" step="1" value={values.position} onChange={(event) => onChange('position', event.target.value)} placeholder="Ex. 7" /></Field>
          <Field label="Statut" required><select value={values.status} onChange={(event) => onChange('status', event.target.value as VehicleStatus)}><option value="preparing">En préparation</option><option value="ready">Prêt pour la parade</option><option value="maintenance">En maintenance</option></select></Field>
          <Field label="Image du véhicule"><input type="url" value={values.image_url} onChange={(event) => onChange('image_url', event.target.value)} placeholder="https://..." /></Field>
          <div className="form-field form-field-full"><label className="toggle-label"><span><strong>Éclairage nocturne</strong><small>Ce véhicule est équipé de lumières pour le spectacle du soir.</small></span><button className={`toggle ${values.has_night_lighting ? 'toggle-on' : ''}`} type="button" role="switch" aria-checked={values.has_night_lighting} onClick={() => onChange('has_night_lighting', !values.has_night_lighting)}><span /></button></label></div>
          <Field label="Notes complémentaires" className="form-field-full"><textarea rows={3} value={values.notes} onChange={(event) => onChange('notes', event.target.value)} placeholder="Ajoutez un détail utile à l'équipe..." /></Field>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="modal-footer"><button className="secondary-button" type="button" onClick={onClose} disabled={saving}>Annuler</button><button className="primary-button" type="submit" disabled={saving}>{saving ? 'Enregistrement...' : mode === 'create' ? <><Plus size={17} /> Ajouter à la parade</> : <><Check size={17} /> Enregistrer les changements</>}</button></div>
      </form>
    </div>
  </div>
)

type FieldProps = { label: string; required?: boolean; className?: string; children: ReactNode }

const Field = ({ label, required, className, children }: FieldProps): ReactElement => <div className={`form-field ${className ?? ''}`}><label>{label}{required && <span> *</span>}</label>{children}</div>

type DeleteModalProps = { vehicle: ParadeVehicle; deleting: boolean; onDelete: () => Promise<void>; onClose: () => void }

const DeleteModal = ({ vehicle, deleting, onDelete, onClose }: DeleteModalProps): ReactElement => (
  <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div className="confirm-card" role="dialog" aria-modal="true" aria-labelledby="delete-title"><div className="confirm-icon"><Trash2 size={23} /></div><h2 id="delete-title">Retirer ce véhicule ?</h2><p><strong>{vehicle.name}</strong> sera définitivement retiré de la composition de la parade. Cette action est irréversible.</p><div className="modal-footer"><button className="secondary-button" type="button" onClick={onClose} disabled={deleting}>Annuler</button><button className="danger-button" type="button" onClick={onDelete} disabled={deleting}>{deleting ? 'Suppression...' : <><Trash2 size={16} /> Retirer le véhicule</>}</button></div></div>
  </div>
)

export default App
