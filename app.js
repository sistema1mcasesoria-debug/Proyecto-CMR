/* ==========================================================================
   CRM LOGIC CORE - MC ASESORÍA Y GESTIÓN
   State management, Local Storage, Intelligent Notes Analyzer, Kanban Board & WhatsApp Templates
   ========================================================================== */

// --- DEFAULT DATA & INITIAL SEEDING ---
// ⚠️ CONFIGURACIÓN CLOUD: Pega aquí tu URL de Google Apps Script una vez la crees.
// Esto conectará el CRM en la nube para ti y tu compañera en cualquier PC con CERO configuraciones de su parte.
const DEFAULT_SYNC_URL = "https://script.google.com/macros/s/AKfycbzgPyP6CHG7zh1zdJexYzXLNrKdRfUZ-7kI3qUK0QvvmuYVKxUZ2YrrPL2HGjeyF1W1/exec"; 

const DEFAULT_MONTHS = ["Mayo 2026", "Junio 2026"];

const DEFAULT_TEMPLATES = {
    contabilidad: {
        contacto_inicial: {
            title: "Mensaje de Contacto Inicial (Bienvenida)",
            stage: "contacto_inicial",
            text: `¡Hola [Nombre]! Le saluda el equipo de MC Asesoría y Gestión. 💼
Gracias por escribirnos. Con el fin de ayudarle a optimizar la contabilidad e impuestos de su negocio, le ofrecemos una asesoría de diagnóstico 100% gratuita.

¿Qué día y hora le acomoda mejor esta semana para agendar una breve llamada? ¡Que tenga un excelente día! ✨`
        },
        asesoria_cuestionario: {
            title: "Cuestionario de Cotización (3 Preguntas)",
            stage: "asesoria",
            text: `Estimado [Nombre], para enviarle una propuesta a medida para sus servicios contables y tributarios, ¿podría apoyarme respondiendo estas 3 breves preguntas? 📊

1️⃣ ¿Cuál es el rubro o actividad principal de su empresa?
2️⃣ ¿Qué régimen tributario tiene (MYPE, General, Especial) o es nuevo?
3️⃣ ¿Cuántas personas en planilla o recibos por honorarios maneja al mes?

Con esta información le preparo su cotización hoy mismo. ¡Muchas gracias! 🙌`
        },
        cotizacion_propuesta: {
            title: "Envío de Propuesta Comercial",
            stage: "cotizacion",
            text: `Estimado [Nombre], de acuerdo con lo conversado, le adjunto la propuesta de nuestros servicios de asesoría contable y tributaria. 📁

En el documento encontrará el detalle del alcance y la cotización mensual. Quedamos a su disposición para cualquier duda o ajuste que requiera.

Saludos cordiales,
MC Asesoría & Gestión`
        },
        seguimiento: {
            title: "Seguimiento de Propuesta (Follow-up)",
            stage: "seguimiento",
            text: `Hola [Nombre], espero que esté teniendo un excelente día.

Le escribo brevemente para consultar si tuvo la oportunidad de revisar la propuesta contable que le enviamos. ¿Tiene alguna duda o le gustaría que coordinemos una llamada de 5 minutos para aclarar detalles?

Quedamos atentos. ¡Saludos! ✨`
        },
        llamada_perdida: {
            title: "Llamada de Asesoría No Contesta",
            stage: "llamada",
            text: `Hola [Nombre], intentamos llamarle para agendar la asesoría gratuita que solicitó, pero no logramos contactarlo. 📞

No se preocupe, quedamos atentos por este medio para que nos indique cuándo le acomoda mejor que le devolvamos la llamada. ¡Buen día!`
        },
        direccion_oficina: {
            title: "Dirección de Oficina (Cita Presencial)",
            stage: "asesoria",
            text: `Estimado [Nombre], con gusto lo recibimos en nuestra oficina.

📍 Dirección: Urb. Villa Alegre, Jr. Guardia Civil Norte Mz E lote 30, Surco.
📍 Referencia: A 2 cuadras del Tottus de Viñedos, al costado de la pollería El Corralito.

¿Qué día y hora le acomoda mejor para su cita presencial?`
        }
    },
    sistemas: {
        contacto_inicial: {
            title: "Mensaje de Contacto Inicial (Bienvenida)",
            stage: "contacto_inicial",
            text: `¡Hola [Nombre]! Le saluda el equipo de Sistemas y ERP de MC Asesoría y Gestión. 💻
Gracias por contactarnos. Con el fin de diseñar o cotizar la solución de software que necesita para su negocio, le ofrecemos una consultoría técnica 100% gratuita.

¿En qué horario de esta semana le va mejor que agendemos una llamada de 5 minutos? ¡Excelente día! ✨`
        },
        asesoria_cuestionario: {
            title: "Cuestionario de Cotización (3 Preguntas)",
            stage: "asesoria",
            text: `Estimado [Nombre], para poder preparar una propuesta técnica y económica para su sistema/ERP, ¿me apoyaría respondiendo estas 3 preguntas rápidas? 🚀

1️⃣ ¿Cuál es el objetivo principal del software o qué procesos desea sistematizar?
2️⃣ ¿Cuántos usuarios estiman que utilizarán la plataforma de forma activa?
3️⃣ ¿Requiere alguna integración específica (facturación electrónica, pasarelas de pago, etc.)?

Con estos detalles le preparo la propuesta inicial. ¡Muchas gracias! 🙌`
        },
        cotizacion_propuesta: {
            title: "Envío de Propuesta Comercial",
            stage: "cotizacion",
            text: `Estimado [Nombre], adjunto le enviamos la propuesta de desarrollo y licenciamiento para su solución de software/ERP. 📁

El documento detalla los entregables, cronograma de desarrollo y el presupuesto. Quedamos atentos a cualquier consulta técnica o funcional para agendar una reunión de revisión.

Saludos cordiales,
MC Asesoría & Gestión (Sistemas)`
        },
        seguimiento: {
            title: "Seguimiento de Propuesta (Follow-up)",
            stage: "seguimiento",
            text: `Hola [Nombre], espero que todo vaya bien.

Le escribo para saber si pudo revisar la propuesta técnica del software que le enviamos. ¿Pudo chequearla con su equipo técnico? Si lo desea, podemos agendar un breve Meet para aclarar cualquier duda sobre las funciones o el alcance.

¡Saludos cordiales! 💻`
        },
        llamada_perdida: {
            title: "Llamada de Asesoría No Contesta",
            stage: "llamada",
            text: `Hola [Nombre], intentamos llamarle para conversar sobre el requerimiento de software/ERP que nos solicitó, pero no logramos comunicarnos. 📞

Por favor, coméntenos por aquí en qué momento del día le acomoda mejor que le llamemos. ¡Buen día!`
        },
        direccion_oficina: {
            title: "Dirección de Oficina (Cita Presencial)",
            stage: "asesoria",
            text: `Estimado [Nombre], con gusto lo recibimos en nuestra oficina para revisar los requerimientos de su sistema.

📍 Dirección: Urb. Villa Alegre, Jr. Guardia Civil Norte Mz E lote 30, Surco.
📍 Referencia: A 2 cuadras del Tottus de Viñedos, al costado de la pollería El Corralito.

¿Qué día y hora le acomoda mejor para su visita?`
        }
    }
};

const DEMO_LEADS = [
    {
        id: "demo-1",
        name: "Corporación Textil del Sur SAC",
        phone: "+51993288049",
        line: "contabilidad",
        stage: "cotizacion",
        lostReason: "",
        date: "2026-05-15",
        month: "Mayo 2026",
        snippet: "Se le envió la cotización contable de régimen mype tributario. Pendiente revisar respuesta.",
        history: [
            { date: "2026-05-15 10:00", text: "Cliente solicita información por WhatsApp contable.", stageFrom: "", stageTo: "contacto_inicial" },
            { date: "2026-05-15 11:30", text: "Llamada realizada. Respondieron el cuestionario de 5 preguntas.", stageFrom: "contacto_inicial", stageTo: "asesoria" },
            { date: "2026-05-16 09:00", text: "Se le envió la propuesta formal.", stageFrom: "asesoria", stageTo: "cotizacion" }
        ]
    },
    {
        id: "demo-2",
        name: "Inmobiliaria Los Robles E.I.R.L.",
        phone: "+51915215929",
        line: "sistemas",
        stage: "seguimiento",
        lostReason: "",
        date: "2026-05-20",
        month: "Mayo 2026",
        snippet: "Interesado en ERP de facturación electrónica. Revisó el brochure y agendó demo.",
        history: [
            { date: "2026-05-20 14:00", text: "Registrado desde contacto web.", stageFrom: "", stageTo: "contacto_inicial" },
            { date: "2026-05-20 16:00", text: "Llamada de presentación de sistemas.", stageFrom: "contacto_inicial", stageTo: "llamada" },
            { date: "2026-05-21 11:00", text: "Demo de ERP realizada con el gerente general.", stageFrom: "llamada", stageTo: "asesoria" },
            { date: "2026-05-21 17:00", text: "Propuesta de implementación ERP enviada.", stageFrom: "asesoria", stageTo: "cotizacion" },
            { date: "2026-05-25 10:00", text: "Seguimiento enviado. Evaluando costos con socios.", stageFrom: "cotizacion", stageTo: "seguimiento" }
        ]
    },
    {
        id: "demo-3",
        name: "Agroindustrial Chavín S.A.",
        phone: "+51988776655",
        line: "contabilidad",
        stage: "ganado",
        lostReason: "",
        date: "2026-05-22",
        month: "Mayo 2026",
        snippet: "¡Contrato cerrado! Outsourcing contable y planillas. Iniciamos operaciones en Junio.",
        history: [
            { date: "2026-05-22 09:00", text: "Lead de campaña.", stageFrom: "", stageTo: "contacto_inicial" },
            { date: "2026-05-22 15:00", text: "Propuesta contable enviada.", stageFrom: "contacto_inicial", stageTo: "cotizacion" },
            { date: "2026-05-26 12:00", text: "Contrato firmado y primer pago recibido. Ganado.", stageFrom: "cotizacion", stageTo: "ganado" }
        ]
    },
    {
        id: "demo-4",
        name: "Minimarket El Progreso",
        phone: "+51933221100",
        line: "sistemas",
        stage: "perdido",
        lostReason: "precio_alto",
        date: "2026-05-24",
        month: "Mayo 2026",
        snippet: "Decidieron no contratar. Comentan que el costo mensual de la licencia ERP excede su presupuesto actual.",
        history: [
            { date: "2026-05-24 10:00", text: "Consulta por sistema POS.", stageFrom: "", stageTo: "contacto_inicial" },
            { date: "2026-05-25 15:00", text: "Se cotizó sistema POS estándar.", stageFrom: "contacto_inicial", stageTo: "cotizacion" },
            { date: "2026-05-27 11:00", text: "Indican que el precio es muy alto. Guardado como Perdido.", stageFrom: "cotizacion", stageTo: "perdido" }
        ]
    }
];

const FUNNEL_STAGES = [
    { id: "contacto_inicial", label: "Contacto Inicial", icon: "message-square" },
    { id: "llamada", label: "Llamada / Contacto", icon: "phone" },
    { id: "asesoria", label: "Asesoría Gratis", icon: "users" },
    { id: "cotizacion", label: "Cotización Enviada", icon: "file-text" },
    { id: "seguimiento", label: "Seguimiento", icon: "trending-up" },
    { id: "ganado", label: "Cierre Ganado 🎉", icon: "check-circle" },
    { id: "perdido", label: "Cierre Perdido ⚠️", icon: "x-circle" }
];

const LOST_REASONS = {
    no_responde: "No responde / WhatsApp fantasma",
    precio_alto: "Precio muy elevado",
    sin_interes: "Sin interés / Desistió",
    competencia: "Se fue con la competencia",
    otros: "Otros motivos / No especificado"
};

// --- APP STATE ---
let state = {
    leads: [],
    months: [],
    activeMonth: "",
    templates: {},
    activeLine: "all", // 'all' | 'contabilidad' | 'sistemas'
    activeNav: "dashboard", // 'dashboard' | 'kanban' | 'clients' | 'templates' | 'backup'
    lastBackupDate: "",
    deletedLeads: [],
    trash: [],
    dateFilterType: "month", // 'month' | 'preset' | 'range'
    startDate: "",
    endDate: "",
    presetName: "este_mes",
    comparePeriod: false,
    adSpend: {
        contabilidad: 0,
        sistemas: 0,
        contabilidadConvs: 0,
        sistemasConvs: 0
    }
};

// --- CORE ANALYZER RULES ---
const AI_RULES = [
    { stage: "perdido", reason: "no_responde", keywords: ["no responde", "no contesta", "apagado", "buzon", "no contesta llamadas", "whatsapp fantasma", "en visto", "no lee"] },
    { stage: "perdido", reason: "precio_alto", keywords: ["caro", "elevado", "fuera de presupuesto", "presupuesto corto", "precio alto", "costoso", "rebaja", "descuento no aceptado"] },
    { stage: "perdido", reason: "sin_interes", keywords: ["desistio", "no le interesa", "ya no desea", "cancelado", "otro momento", "proximo año", "sin interes", "mas adelante"] },
    { stage: "perdido", reason: "competencia", keywords: ["competencia", "otro proveedor", "otra empresa", "mas barato con", "trabaja con otro", "ya tiene asesor"] },
    { stage: "llamada", keywords: ["llamar", "llamada", "telefono", "llame", "marcar", "contacto telefonico", "conversar por telefono", "agendamos llamada"] },
    { stage: "asesoria", keywords: ["asesoria", "asesoria gratis", "reunion", "agendar reunion", "cita", "oficina", "zoom", "meet", "brochure", "presentacion", "conocer"] },
    { stage: "cotizacion", keywords: ["enviar propuesta", "enviada cotizacion", "propuesta comercial", "enviado propuesta", "adjunto propuesta", "enviada propuesta", "cotizar", "precio mensual", "cuestionario"] },
    { stage: "seguimiento", keywords: ["seguimiento", "revisar propuesta", "pudo revisar", "evaluando", "pensando", "comentarios de propuesta", "pendiente respuesta"] },
    { stage: "ganado", keywords: ["ganado", "cerrado", "contratado", "contrato firmado", "pago realizado", "deposito", "transferencia", "iniciamos", "empezamos", "acepto propuesta"] }
];

// --- INITIALIZE APPLICATION ---
document.addEventListener("DOMContentLoaded", () => {
    loadState();
    setupEventListeners();
    renderApp();
    lucide.createIcons();
    
    // Solicitar permisos de notificación nativa
    requestNotificationPermission();
    
    // Auto pull or push to cloud on startup to sync between multiple PCs!
    if (state.syncUrl) {
        checkAndAutoSyncOnStartup();
        
        // ¡COLABORACIÓN EN TIEMPO REAL Y RECORDATORIOS ACTIVOS! 
        // Revisa la nube y comprueba citas cada 30 segundos en segundo plano. 
        // Si hay una reunión programada en los próximos 15 minutos, te avisará con una notificación nativa.
        setInterval(() => {
            checkAndAutoSyncOnStartup();
            checkUpcomingMeetingsNotifications();
        }, 30000);

        // Sincronizar inmediatamente al volver a enfocar la pestaña del CRM
        let lastSyncTime = Date.now();
        const handleTabFocusSync = () => {
            // Throttle para evitar peticiones API excesivas (mínimo 5 segundos de intervalo)
            if (Date.now() - lastSyncTime > 5000) {
                lastSyncTime = Date.now();
                checkAndAutoSyncOnStartup();
            }
        };
        window.addEventListener("focus", handleTabFocusSync);
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                handleTabFocusSync();
            }
        });
    } else {
        // Si trabaja offline, también comprobar recordatorios locales cada 30 segundos
        setInterval(checkUpcomingMeetingsNotifications, 30000);
    }
    
    // Comprobación inicial de recordatorios a los 2 segundos de cargar
    setTimeout(checkUpcomingMeetingsNotifications, 2000);
});

// --- STATE MANAGEMENT ---
function loadState() {
    try {
        const storedLeads = localStorage.getItem("mc_crm_leads");
        const storedMonths = localStorage.getItem("mc_crm_months");
        const storedActiveMonth = localStorage.getItem("mc_crm_active_month");
        const storedTemplates = localStorage.getItem("mc_crm_templates");
        const storedBackup = localStorage.getItem("mc_crm_last_backup");
        const storedSyncUrl = localStorage.getItem("mc_crm_sync_url");

        const storedDeletedLeads = localStorage.getItem("mc_crm_deleted_leads");
        state.deletedLeads = storedDeletedLeads ? JSON.parse(storedDeletedLeads) : [];

        const storedDeletedMonths = localStorage.getItem("mc_crm_deleted_months");
        state.deletedMonths = storedDeletedMonths ? JSON.parse(storedDeletedMonths) : [];

        const storedTrash = localStorage.getItem("mc_crm_trash");
        state.trash = storedTrash ? JSON.parse(storedTrash) : [];

        const storedAdSpend = localStorage.getItem("mc_crm_adspend");
        state.adSpend = storedAdSpend ? JSON.parse(storedAdSpend) : { contabilidad: 0, sistemas: 0, contabilidadConvs: 0, sistemasConvs: 0 };

        if (storedLeads && storedMonths && storedActiveMonth) {
            state.leads = JSON.parse(storedLeads);
            state.months = JSON.parse(storedMonths);
            state.activeMonth = storedActiveMonth;
            
            // Check if user has old cached templates (with old address/name) and auto-heal them!
            let loadedTemplates = storedTemplates ? JSON.parse(storedTemplates) : null;
            if (!loadedTemplates || Object.keys(loadedTemplates).length === 0 ||
                !loadedTemplates.contabilidad || !loadedTemplates.sistemas ||
                JSON.stringify(loadedTemplates).includes("Vítores") || 
                JSON.stringify(loadedTemplates).includes("Loma de los Suspiros") || 
                JSON.stringify(loadedTemplates).includes("MM Asesoría")) {
                loadedTemplates = { ...DEFAULT_TEMPLATES };
                localStorage.setItem("mc_crm_templates", JSON.stringify(loadedTemplates));
            }
            state.templates = loadedTemplates;
            
            state.lastBackupDate = storedBackup || "";
            state.syncUrl = storedSyncUrl || DEFAULT_SYNC_URL || "";
        } else {
            // First load in this browser: initialize locally, but DO NOT call saveState() (to avoid overwriting the cloud!)
            state.leads = [...DEMO_LEADS];
            state.months = [...DEFAULT_MONTHS];
            state.activeMonth = "Mayo 2026";
            state.templates = { ...DEFAULT_TEMPLATES };
            state.deletedLeads = [];
            state.deletedMonths = [];
            state.trash = [];
            state.lastBackupDate = "";
            state.syncUrl = DEFAULT_SYNC_URL || "";
            
            // Save locally without triggering triggerCloudSync()
            localStorage.setItem("mc_crm_leads", JSON.stringify(state.leads));
            localStorage.setItem("mc_crm_months", JSON.stringify(state.months));
            localStorage.setItem("mc_crm_active_month", state.activeMonth);
            localStorage.setItem("mc_crm_templates", JSON.stringify(state.templates));
            localStorage.setItem("mc_crm_deleted_leads", JSON.stringify(state.deletedLeads));
            localStorage.setItem("mc_crm_deleted_months", JSON.stringify(state.deletedMonths));
            localStorage.setItem("mc_crm_trash", JSON.stringify(state.trash));
            localStorage.setItem("mc_crm_last_save_time", new Date(0).toISOString()); // Set to 1970 so Cloud ALWAYS overrides on first load!
            if (state.syncUrl) {
                localStorage.setItem("mc_crm_sync_url", state.syncUrl);
            }
        }
        
        // Restore theme
        const savedTheme = localStorage.getItem("mc_theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        updateThemeToggleButton(savedTheme);
    } catch (e) {
        console.error("Error loading CRM state:", e);
        state.leads = [];
        state.months = [...DEFAULT_MONTHS];
        state.activeMonth = "Mayo 2026";
        state.templates = { ...DEFAULT_TEMPLATES };
        state.deletedMonths = [];
        state.trash = [];
    }
}

function saveState() {
    try {
        localStorage.setItem("mc_crm_leads", JSON.stringify(state.leads));
        localStorage.setItem("mc_crm_months", JSON.stringify(state.months));
        localStorage.setItem("mc_crm_active_month", state.activeMonth);
        localStorage.setItem("mc_crm_templates", JSON.stringify(state.templates));
        localStorage.setItem("mc_crm_deleted_leads", JSON.stringify(state.deletedLeads || []));
        localStorage.setItem("mc_crm_deleted_months", JSON.stringify(state.deletedMonths || []));
        localStorage.setItem("mc_crm_trash", JSON.stringify(state.trash || []));
        localStorage.setItem("mc_crm_adspend", JSON.stringify(state.adSpend || { contabilidad: 0, sistemas: 0, contabilidadConvs: 0, sistemasConvs: 0 }));
        
        const saveTime = new Date().toISOString();
        localStorage.setItem("mc_crm_last_save_time", saveTime);

        if (state.lastBackupDate) {
            localStorage.setItem("mc_crm_last_backup", state.lastBackupDate);
        }
        if (state.syncUrl) {
            localStorage.setItem("mc_crm_sync_url", state.syncUrl);
        }
        updateBackupIndicator();
        
        // Trigger auto sync in background if configured
        if (state.syncUrl) {
            triggerCloudSync();
        }
    } catch (e) {
        console.error("Error saving CRM state:", e);
    }
}

// --- BACKUP WIDGET DOT ---
function updateBackupIndicator() {
    const dot = document.getElementById("backup-indicator-dot");
    const text = document.getElementById("backup-status-text");
    if (!dot || !text) return;

    if (!state.lastBackupDate) {
        dot.className = "status-indicator warning";
        text.textContent = "Sin respaldar recientemente";
        return;
    }

    const lastDate = new Date(state.lastBackupDate);
    const today = new Date();
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
        dot.className = "status-indicator success";
        text.textContent = `Respaldado hace ${diffDays <= 1 ? "poco" : diffDays + " días"}`;
    } else {
        dot.className = "status-indicator warning";
        text.textContent = `Respaldo antiguo: ${diffDays} días`;
    }
}

// --- RENDER DISPATCHER ---
function renderApp() {
    // 1. Render Active Month Selectors
    renderMonthSelectors();

    // 2. Filter Leads based on Active Month & Line
    const filteredLeads = getFilteredLeads();

    // 3. Render Views
    renderDashboard(filteredLeads);
    renderKanban(filteredLeads);
    renderClientList(filteredLeads);
    renderTemplateSection();
    
    // Refresh calendar if active view
    if (state.activeNav === "calendar") {
        renderCalendar();
    }

    // Refresh metrics dashboard if active view
    if (state.activeNav === "metrics") {
        renderMetricsDashboard(filteredLeads);
    }
    
    // Refresh Icons
    lucide.createIcons();
}

// Helper to get active filter date range
function getActiveFilterRange() {
    if (state.dateFilterType === "month") {
        return null;
    }
    if (state.dateFilterType === "preset") {
        return getPresetDateRange(state.presetName);
    }
    if (state.dateFilterType === "range") {
        return { start: state.startDate, end: state.endDate };
    }
    return null;
}

// --- FILTER CORE ---
function getFilteredLeads() {
    return state.leads.filter(lead => {
        // 1. Line match
        const matchLine = state.activeLine === "all" || lead.line === state.activeLine;
        if (!matchLine) return false;

        // 2. Date match
        if (state.dateFilterType === "month") {
            return lead.month === state.activeMonth;
        } else {
            const range = getActiveFilterRange();
            if (range && lead.date) {
                return lead.date >= range.start && lead.date <= range.end;
            }
            return true;
        }
    });
}

// --- RENDER MONTH SELECTORS ---
function renderMonthSelectors() {
    const mainSelect = document.getElementById("month-select");
    const modalSelect = document.getElementById("client-month-select");
    if (!mainSelect || !modalSelect) return;

    // Fill main
    mainSelect.innerHTML = "";
    state.months.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        if (m === state.activeMonth) opt.selected = true;
        mainSelect.appendChild(opt);
    });

    // Fill modal
    modalSelect.innerHTML = "";
    state.months.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        modalSelect.appendChild(opt);
    });

    // Sync custom date range picker UI elements
    if (typeof syncDatePickerUIFromState === "function") {
        syncDatePickerUIFromState();
    }
}

// --- VIEW 1: DASHBOARD RENDERER ---
function renderDashboard(leads) {
    const totalCount = leads.length;
    const wonLeads = leads.filter(l => l.stage === "ganado");
    const lostLeads = leads.filter(l => l.stage === "perdido");
    
    const wonCount = wonLeads.length;
    const lostCount = lostLeads.length;
    const conversionRate = totalCount > 0 ? Math.round((wonCount / totalCount) * 100) : 0;

    // Calculate Pipeline Value (Active Leads sum) & Won Revenue in Soles and Dollars desglosando el IGV
    const activeLeads = leads.filter(l => l.stage !== "ganado" && l.stage !== "perdido");
    let penBase = 0, penWithIgv = 0, usdBase = 0, usdWithIgv = 0;
    activeLeads.forEach(l => {
        const det = parseBudgetDetails(l.budget);
        const val = det.amount;
        const valWithIgv = det.hasIgv ? val * 1.18 : val;
        if (det.currency === "USD") { 
            usdBase += val; 
            usdWithIgv += valWithIgv; 
        } else { 
            penBase += val; 
            penWithIgv += valWithIgv; 
        }
    });

    let wonPenBase = 0, wonPenWithIgv = 0, wonUsdBase = 0, wonUsdWithIgv = 0;
    wonLeads.forEach(l => {
        const det = parseBudgetDetails(l.budget);
        const val = det.amount;
        const valWithIgv = det.hasIgv ? val * 1.18 : val;
        if (det.currency === "USD") { 
            wonUsdBase += val; 
            wonUsdWithIgv += valWithIgv; 
        } else { 
            wonPenBase += val; 
            wonPenWithIgv += valWithIgv; 
        }
    });

    // Update statistics numbers
    document.getElementById("stat-total").textContent = totalCount;
    document.getElementById("stat-won").textContent = wonCount;
    document.getElementById("stat-lost").textContent = lostCount;
    document.getElementById("stat-conversion").textContent = `${conversionRate}%`;
    document.getElementById("stat-conversion-bar").style.width = `${conversionRate}%`;
    
    // Update financial stats (premium multi-currency + IGV)
    const pipelineEl = document.getElementById("stat-pipeline-value");
    const pipelineSub = document.getElementById("stat-pipeline-subtitle");
    if (pipelineEl) pipelineEl.innerHTML = formatFinancialStats(penBase, usdBase);
    if (pipelineSub) pipelineSub.textContent = formatFinancialSubtitle(penBase, penWithIgv, usdBase, usdWithIgv);

    const wonValEl = document.getElementById("stat-won-value");
    const wonSub = document.getElementById("stat-won-subtitle");
    if (wonValEl) wonValEl.innerHTML = formatFinancialStats(wonPenBase, wonUsdBase);
    if (wonSub) wonSub.textContent = formatFinancialSubtitle(wonPenBase, wonPenWithIgv, wonUsdBase, wonUsdWithIgv);

    // Inactivity warning alerts for Dashboard
    const inactiveLeads = leads.filter(l => l.stage !== "ganado" && l.stage !== "perdido" && getDaysSinceLastUpdate(l) >= 3);
    let alertContainer = document.getElementById("dashboard-inactive-alert");
    if (!alertContainer) {
        alertContainer = document.createElement("div");
        alertContainer.id = "dashboard-inactive-alert";
        const grid = document.querySelector(".metrics-grid");
        if (grid) {
            grid.parentNode.insertBefore(alertContainer, grid.nextSibling);
        }
    }
    if (inactiveLeads.length > 0) {
        alertContainer.className = "details-card warning-card";
        alertContainer.style.marginTop = "20px";
        alertContainer.style.marginBottom = "20px";
        alertContainer.style.borderLeft = "4px solid var(--danger)";
        alertContainer.style.display = "block";
        alertContainer.innerHTML = `
            <div class="card-header" style="padding:12px 20px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; border-bottom:1px solid var(--border-color);">
                <h3 class="card-title" style="color:var(--danger); display:flex; align-items:center; gap:8px; margin:0; font-size:0.95rem; font-weight:700;">
                    <i data-lucide="bell" style="width:16px; height:16px;"></i> ⚠️ ALERTA DE SEGUIMIENTO: ¡Tienes ${inactiveLeads.length} clientes sin contacto hace más de 3 días!
                </h3>
                <span class="card-badge alert" style="background-color:var(--danger-light); color:var(--danger); font-size:0.7rem; font-weight:800; padding:2px 6px;">¡Atención Urgente!</span>
            </div>
            <div class="card-body" style="padding:12px 20px; display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:10px; max-height: 250px; overflow-y: auto;">
                ${inactiveLeads.map(l => `
                    <div onclick="openEditLeadModal('${l.id}')" style="background:var(--bg-hover); border:1px solid var(--border-color); border-radius:6px; padding:8px 12px; cursor:pointer; display:flex; flex-direction:column; gap:4px; transition:all 0.2s ease;">
                        <span style="font-weight:700; font-size:0.8rem; color:var(--text-primary); max-width:180px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${l.name}</span>
                        <span style="font-size:0.7rem; color:var(--text-secondary); display:flex; justify-content:space-between;">
                            <span>Etapa: ${FUNNEL_STAGES.find(s => s.id === l.stage).label}</span>
                            <span style="color:var(--danger); font-weight:700;">🔥 ${getDaysSinceLastUpdate(l)} días sin contacto</span>
                        </span>
                    </div>
                `).join("")}
            </div>
        `;
    } else {
        alertContainer.style.display = "none";
    }

    // Render Funnel Visualizer Bars
    const funnelContainer = document.getElementById("dashboard-funnel");
    if (funnelContainer) {
        funnelContainer.innerHTML = "";
        
        FUNNEL_STAGES.forEach(stage => {
            const count = leads.filter(l => l.stage === stage.id).length;
            const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
            
            const row = document.createElement("div");
            row.className = "funnel-row";
            row.innerHTML = `
                <div class="funnel-label" title="${stage.label}">${stage.label}</div>
                <div class="funnel-bar-container" onclick="switchToKanbanView()">
                    <div class="funnel-bar" style="width: ${totalCount > 0 ? Math.max(8, pct) : 0}%">
                        <span class="funnel-bar-value">${count}</span>
                    </div>
                    <span class="funnel-bar-percent">${pct}%</span>
                </div>
            `;
            funnelContainer.appendChild(row);
        });
    }

    // Render Lost Reasons Breakdown
    const reasonsContainer = document.getElementById("dashboard-lost-reasons");
    if (reasonsContainer) {
        reasonsContainer.innerHTML = "";
        
        const reasonsData = {};
        Object.keys(LOST_REASONS).forEach(k => reasonsData[k] = 0);
        
        lostLeads.forEach(lead => {
            const r = lead.lostReason || "otros";
            reasonsData[r] = (reasonsData[r] || 0) + 1;
        });

        const totalLost = lostCount || 1; // avoid divide by zero

        Object.entries(LOST_REASONS).forEach(([key, label]) => {
            const count = reasonsData[key] || 0;
            const pct = Math.round((count / totalLost) * 100);

            const item = document.createElement("div");
            item.className = "reason-item";
            item.innerHTML = `
                <div class="reason-info">
                    <span class="reason-label">${label}</span>
                    <span class="reason-count">${count} leads (${pct}%)</span>
                </div>
                <div class="reason-progress">
                    <div class="reason-bar" style="width: ${lostCount > 0 ? pct : 0}%"></div>
                </div>
            `;
            reasonsContainer.appendChild(item);
        });
    }

    // Render Recent Leads Table
    const recentTable = document.getElementById("dashboard-recent-leads");
    if (recentTable) {
        recentTable.innerHTML = "";
        
        // Sort leads by latest updated (or just reverse chronological order of their registration date/history)
        const sortedLeads = [...leads].sort((a, b) => {
            const dateA = (a.history && a.history.length > 0) ? a.history[a.history.length - 1].date : a.date;
            const dateB = (b.history && b.history.length > 0) ? b.history[b.history.length - 1].date : b.date;
            return dateB.localeCompare(dateA);
        }).slice(0, 5); // top 5 recent

        if (sortedLeads.length === 0) {
            recentTable.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 30px 0;">No hay clientes registrados en este mes todavía.</td></tr>`;
            return;
        }

        sortedLeads.forEach(lead => {
            const tr = document.createElement("tr");
            
            // Generar insignias compactas de presupuesto y reunión para el Dashboard
            let budgetBadge = lead.budget ? `<span style="font-size: 0.7rem; font-weight:700; color:var(--success); margin-right:6px; display:inline-flex; align-items:center; gap:2px;"><i data-lucide="dollar-sign" style="width:10px; height:10px;"></i>${lead.budget}</span>` : "";
            let meetingBadge = lead.meeting ? `<span style="font-size: 0.7rem; font-weight:700; color:var(--warning); background-color:var(--warning-light); padding:1px 4px; border-radius:3px; border:1px dashed rgba(217, 119, 6, 0.3); margin-right:6px; display:inline-flex; align-items:center; gap:2px;"><i data-lucide="calendar" style="width:10px; height:10px;"></i>${lead.meeting}</span>` : "";
            
            let badgesHTML = "";
            if (budgetBadge || meetingBadge) {
                badgesHTML = `<div style="margin-top: 4px; display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">${budgetBadge}${meetingBadge}</div>`;
            }

            tr.innerHTML = `
                <td>
                    <div class="client-name-cell">
                        <span class="client-meta-title" style="font-weight:700; color:var(--text-primary);">${lead.name}</span>
                        <span class="client-meta-subtitle">Agregado: ${lead.date}</span>
                        ${badgesHTML}
                    </div>
                </td>
                <td>
                    <a href="https://wa.me/${String(lead.phone || "").replace(/[^0-9+]/g, '')}" target="_blank" class="card-phone" style="margin-bottom: 0; color: var(--success); font-weight:600;">
                        <i data-lucide="phone" style="width: 14px; height:14px; margin-top:2px;"></i> ${lead.phone}
                    </a>
                </td>
                <td>
                    <span class="card-line-tag ${lead.line}">${lead.line === 'contabilidad' ? 'Contabilidad' : 'Sistemas'}</span>
                </td>
                <td>
                    <span class="status-tag ${lead.stage}">${FUNNEL_STAGES.find(s => s.id === lead.stage).label}</span>
                </td>
                <td>
                    <div style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 0.8rem; color: var(--text-secondary);" title="${lead.snippet || 'Sin observaciones'}">
                        ${lead.snippet || '<i>Sin comentarios</i>'}
                    </div>
                </td>
                <td>
                    <div class="card-actions" style="border:none; padding:0; justify-content: flex-start; gap:12px;">
                        <button class="card-btn" onclick="openEditLeadModal('${lead.id}')" title="Editar lead"><i data-lucide="edit-2" style="width: 16px; height: 16px;"></i></button>
                        <button class="card-btn" onclick="openTemplatesForLead('${lead.id}')" title="WhatsApp Templates"><i data-lucide="message-square" style="width: 16px; height: 16px; color: var(--primary);"></i></button>
                    </div>
                </td>
            `;
            recentTable.appendChild(tr);
        });
    }

    // Render Dashboard Agenda Widget using all leads filtered only by activeLine, not restricted by registration month
    const agendaLeads = state.leads.filter(l => state.activeLine === "all" || l.line === state.activeLine);
    renderDashboardAgenda(agendaLeads);

    // Render Campaign & ROI Performance Monitor
    renderRoiMonitor();
}

// Renderiza el monitor interactivo de Meta Ads, costo por conversión (CPL) y ROI
function renderRoiMonitor() {
    const selectEl = document.getElementById("roi-line-select");
    const container = document.getElementById("roi-monitor-container");
    if (!container) return;

    if (selectEl && state.activeLine !== "all") {
        selectEl.value = state.activeLine;
    }

    const line = selectEl ? selectEl.value : "contabilidad";

    // Count today's leads in CRM for this line
    const localDate = new Date();
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    // Leads that match today's date and the selected line
    const todayLeadsCount = state.leads.filter(l => l.date === todayStr && l.line === line).length;

    let contentHTML = "";

    if (line === "all") {
        // Counts
        const contabilidadToday = state.leads.filter(l => l.date === todayStr && l.line === "contabilidad").length;
        const sistemasToday = state.leads.filter(l => l.date === todayStr && l.line === "sistemas").length;

        // Contabilidad elements
        let statusBadgeCont = "";
        let statusClassCont = "";
        if (contabilidadToday >= 2) {
            statusBadgeCont = "🟢 Saludable";
            statusClassCont = "success";
        } else if (contabilidadToday > 0) {
            statusBadgeCont = "🟡 Esperado";
            statusClassCont = "warning";
        } else {
            statusBadgeCont = "⚪ Sin leads";
            statusClassCont = "neutral";
        }

        // Sistemas elements
        let statusBadgeSist = "";
        let statusClassSist = "";
        if (sistemasToday >= 1) {
            statusBadgeSist = "🟢 Saludable";
            statusClassSist = "success";
        } else {
            statusBadgeSist = "⚪ Sin leads";
            statusClassSist = "neutral";
        }

        contentHTML = `
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
                <!-- CAMP 1: CONTABILIDAD -->
                <div style="background:var(--bg-hover); border:1px solid var(--border-color); padding:18px; border-radius:var(--radius-md); display:flex; flex-direction:column; gap:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.8rem; font-weight:800; color:var(--text-primary); text-transform:uppercase; display:inline-flex; align-items:center; gap:6px;">
                            <i class="dot contabilidad"></i> Contabilidad (Servicios)
                        </span>
                        <span class="status-tag ${statusClassCont}" style="margin:0; font-size:0.7rem; font-weight:700; padding:2px 6px;">${statusBadgeCont}</span>
                    </div>

                    <div style="text-align:center; padding:10px 0; background:rgba(236, 72, 153, 0.04); border-radius:var(--radius-sm); border: 1px dashed rgba(236, 72, 153, 0.15);">
                        <div style="font-size:2.4rem; font-weight:800; color:rgb(236, 72, 153); line-height:1;">${contabilidadToday}</div>
                        <div style="font-size:0.75rem; font-weight:600; color:var(--text-secondary); margin-top:4px;">Mensajes hoy</div>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:8px; font-size:0.78rem;">
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">Presupuesto:</span>
                            <span style="font-weight:700; color:var(--text-primary);">S/. 25.00 / día</span>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">CPL de Mercado:</span>
                            <span style="font-weight:700; color:var(--text-primary);">S/. 8.00 - S/. 12.00</span>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">Esperado Diario:</span>
                            <span style="font-weight:700; color:var(--text-primary);">2 - 3 leads / día</span>
                        </div>
                    </div>

                    <div style="background:var(--primary-light); padding:10px 12px; border-radius:var(--radius-sm); font-size:0.72rem; line-height:1.4; color:var(--primary); font-weight:500; border-left: 3px solid var(--primary);">
                        <strong>Retorno (ROI):</strong> Invertir S/. 750/mes genera ~60-90 leads. Cerrar 10% (6-9 clientes) a S/. 200/mes rinde <strong>S/. 1,200 a S/. 1,800 recurrentes</strong>.
                    </div>
                </div>

                <!-- CAMP 2: SISTEMAS / ERP -->
                <div style="background:var(--bg-hover); border:1px solid var(--border-color); padding:18px; border-radius:var(--radius-md); display:flex; flex-direction:column; gap:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.8rem; font-weight:800; color:var(--text-primary); text-transform:uppercase; display:inline-flex; align-items:center; gap:6px;">
                            <i class="dot sistemas"></i> Sistemas / Software ERP
                        </span>
                        <span class="status-tag ${statusClassSist}" style="margin:0; font-size:0.7rem; font-weight:700; padding:2px 6px;">${statusBadgeSist}</span>
                    </div>

                    <div style="text-align:center; padding:10px 0; background:rgba(59, 130, 246, 0.04); border-radius:var(--radius-sm); border: 1px dashed rgba(59, 130, 246, 0.15);">
                        <div style="font-size:2.4rem; font-weight:800; color:rgb(59, 130, 246); line-height:1;">${sistemasToday}</div>
                        <div style="font-size:0.75rem; font-weight:600; color:var(--text-secondary); margin-top:4px;">Mensajes hoy</div>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:8px; font-size:0.78rem;">
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">Presupuesto:</span>
                            <span style="font-weight:700; color:var(--text-primary);">S/. 30.00 / día</span>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">CPL MC Real vs Mercado:</span>
                            <span style="font-weight:700; color:var(--success);">S/. 18.87 vs S/. 15 - 35</span>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">Esperado Diario:</span>
                            <span style="font-weight:700; color:var(--text-primary);">1 - 2 lead(s) / día</span>
                        </div>
                    </div>

                    <div style="background:rgba(16, 185, 129, 0.06); padding:10px 12px; border-radius:var(--radius-sm); font-size:0.72rem; line-height:1.4; color:var(--success); font-weight:500; border-left: 3px solid var(--success);">
                        <strong>Retorno (ROI):</strong> Ticket alto. Invertir S/. 200 genera 10 leads; cerrando solo 1, recuperas la inversión y ganas contratos de <strong>S/. 2,000 a S/. 10,000+</strong>.
                    </div>
                </div>
            </div>
        `;
    } else if (line === "contabilidad") {
        // Benchmarks for Contabilidad
        const budget = 25.00;
        const minExpected = 2;
        const maxExpected = 3;
        const marketCpl = "S/. 8.00 - S/. 12.00";
        
        let statusBadge = "";
        let statusClass = "";
        if (todayLeadsCount >= minExpected) {
            statusBadge = "🟢 Saludable / Óptimo";
            statusClass = "success";
        } else if (todayLeadsCount > 0) {
            statusBadge = "🟡 Dentro de lo esperado";
            statusClass = "warning";
        } else {
            statusBadge = "⚪ Sin mensajes registrados hoy";
            statusClass = "neutral";
        }

        contentHTML = `
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
                <!-- Left panel: Today's Status & Benchmarks -->
                <div style="background:var(--bg-hover); border:1px solid var(--border-color); padding:16px; border-radius:var(--radius-md); display:flex; flex-direction:column; gap:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.75rem; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em;">Estado de Campaña</span>
                        <span class="status-tag ${statusClass}" style="margin:0; font-size:0.75rem; font-weight:700; padding:4px 8px;">${statusBadge}</span>
                    </div>
                    
                    <div style="text-align:center; padding:10px 0;">
                        <div style="font-size:2.8rem; font-weight:800; color:var(--primary); line-height:1;">${todayLeadsCount}</div>
                        <div style="font-size:0.75rem; font-weight:600; color:var(--text-secondary); margin-top:4px;">Mensajes recibidos hoy</div>
                    </div>
                    
                    <div style="display:flex; flex-direction:column; gap:8px; border-top:1px solid var(--border-color); padding-top:12px; font-size:0.8rem;">
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">Presupuesto Diario:</span>
                            <span style="font-weight:700; color:var(--text-primary);">S/. ${budget.toFixed(2)} / día</span>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">Rango Mensajes Esperados:</span>
                            <span style="font-weight:700; color:var(--text-primary);">${minExpected} - ${maxExpected} leads / día</span>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">Rango CPL Normal de Mercado:</span>
                            <span style="font-weight:700; color:var(--text-primary);">${marketCpl}</span>
                        </div>
                    </div>
                </div>

                <!-- Right panel: ROI Math & Explanation for Supervisor -->
                <div style="display:flex; flex-direction:column; gap:14px;">
                    <div style="background:var(--primary-light); border-left:4px solid var(--primary); padding:16px; border-radius:var(--radius-md);">
                        <h4 style="margin:0 0 6px 0; font-size:0.85rem; font-weight:700; color:var(--primary); text-transform:uppercase;">¿Por qué este volumen es normal?</h4>
                        <p style="margin:0; font-size:0.8rem; line-height:1.45; color:var(--text-primary);">
                            Para captar <strong>empresas formales</strong> (SAC, SRL, Mype tributaria) que paguen una mensualidad de S/. 200 a más, el costo por lead en Perú ronda los S/. 8.00 - S/. 12.00. Es un público selecto de dueños de negocios formales, por lo que con un presupuesto de S/. 25 diario lo saludable y realista es recibir entre 2 y 3 prospectos al día.
                        </p>
                    </div>

                    <div style="background:rgba(16, 185, 129, 0.08); border-left:4px solid var(--success); padding:16px; border-radius:var(--radius-md);">
                        <h4 style="margin:0 0 6px 0; font-size:0.85rem; font-weight:700; color:var(--success); text-transform:uppercase;">La Matemática del Retorno (ROI)</h4>
                        <ul style="margin:0; padding-left:16px; font-size:0.8rem; line-height:1.45; color:var(--text-primary); display:flex; flex-direction:column; gap:4px;">
                            <li><strong>Inversión Mensual:</strong> S/. 750 (S/. 25 x 30 días) genera aprox. 60 a 90 leads calificados.</li>
                            <li><strong>Tasa de Cierre Conservadora:</strong> Si se cierra solo el 10% (6 a 9 nuevos clientes formales) de un ticket promedio de S/. 200/mes...</li>
                            <li><strong>Retorno Recurrente:</strong> Habrás ganado <strong>S/. 1,200 a S/. 1,800 mensuales continuos</strong> invirtiendo S/. 750 una vez. El retorno es altamente viable y rentable.</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Benchmarks for Sistemas / ERP
        const budget = 30.00;
        const minExpected = 1;
        const maxExpected = 2;
        const marketCpl = "S/. 15.00 - S/. 35.00";
        const currentCpl = 18.87;
        
        let statusBadge = "";
        let statusClass = "";
        if (todayLeadsCount >= minExpected) {
            statusBadge = "🟢 Saludable / Óptimo";
            statusClass = "success";
        } else if (todayLeadsCount === 0) {
            statusBadge = "⚪ Sin mensajes registrados hoy";
            statusClass = "neutral";
        } else {
            statusBadge = "🟡 Dentro de lo esperado";
            statusClass = "warning";
        }

        contentHTML = `
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
                <!-- Left panel: Today's Status & Benchmarks -->
                <div style="background:var(--bg-hover); border:1px solid var(--border-color); padding:16px; border-radius:var(--radius-md); display:flex; flex-direction:column; gap:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.75rem; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em;">Estado de Campaña</span>
                        <span class="status-tag ${statusClass}" style="margin:0; font-size:0.75rem; font-weight:700; padding:4px 8px;">${statusBadge}</span>
                    </div>
                    
                    <div style="text-align:center; padding:10px 0;">
                        <div style="font-size:2.8rem; font-weight:800; color:var(--primary); line-height:1;">${todayLeadsCount}</div>
                        <div style="font-size:0.75rem; font-weight:600; color:var(--text-secondary); margin-top:4px;">Mensajes recibidos hoy</div>
                    </div>
                    
                    <div style="display:flex; flex-direction:column; gap:8px; border-top:1px solid var(--border-color); padding-top:12px; font-size:0.8rem;">
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">Presupuesto Diario:</span>
                            <span style="font-weight:700; color:var(--text-primary);">S/. ${budget.toFixed(2)} / día</span>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">Rango Mensajes Esperados:</span>
                            <span style="font-weight:700; color:var(--text-primary);">${minExpected} - ${maxExpected} lead(s) / día</span>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">Costo por Mensaje Real MC:</span>
                            <span style="font-weight:700; color:var(--success); background-color:rgba(16,185,129,0.1); padding:2px 6px; border-radius:3px;">S/. ${currentCpl.toFixed(2)} (Éxito Rotundo)</span>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <span style="color:var(--text-secondary);">Rango CPL Normal de Mercado:</span>
                            <span style="font-weight:700; color:var(--text-primary);">${marketCpl}</span>
                        </div>
                    </div>
                </div>

                <!-- Right panel: ROI Math & Explanation for Supervisor -->
                <div style="display:flex; flex-direction:column; gap:14px;">
                    <div style="background:var(--primary-light); border-left:4px solid var(--primary); padding:16px; border-radius:var(--radius-md);">
                        <h4 style="margin:0 0 6px 0; font-size:0.85rem; font-weight:700; color:var(--primary); text-transform:uppercase;">¿Por qué cuesta más el lead de IT / ERP?</h4>
                        <p style="margin:0; font-size:0.8rem; line-height:1.45; color:var(--text-primary);">
                            El comprador de software es un <strong>Gerente de TI, Director de Operaciones o Dueño de empresa mediana (B2B corporativo)</strong>. Son perfiles difíciles de encontrar en redes sociales y su tiempo digital es escaso, lo que encarece la subasta en Meta (rango normal: S/. 15.00 a S/. 35.00). Pagar <strong>S/. ${currentCpl.toFixed(2)}</strong> es sumamente barato y rentable.
                        </p>
                    </div>

                    <div style="background:rgba(16, 185, 129, 0.08); border-left:4px solid var(--success); padding:16px; border-radius:var(--radius-md);">
                        <h4 style="margin:0 0 6px 0; font-size:0.85rem; font-weight:700; color:var(--success); text-transform:uppercase;">La Matemática de Ventas (ROI)</h4>
                        <ul style="margin:0; padding-left:16px; font-size:0.8rem; line-height:1.45; color:var(--text-primary); display:flex; flex-direction:column; gap:4px;">
                            <li><strong>Ticket Alto:</strong> Un software ERP o desarrollo no vale S/. 50. Son contratos mensuales corporativos o proyectos de <strong>S/. 2,000 a S/. 10,000+</strong>.</li>
                            <li><strong>Costo de Adquisición (CAC):</strong> Con un costo por lead de S/. 20.00, invertir S/. 200.00 te trae 10 leads. Con cerrar solo <strong>1 de cada 10 leads</strong> (10% de tasa de cierre), habrás ganado un cliente de ERP por solo S/. 200.00 de inversión en publicidad. <strong>El ROI es gigantesco.</strong></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = contentHTML;
    
    // Create icons in the newly rendered HTML if lucide is active
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Renderiza el widget interactivo de Agenda de Citas en el Dashboard
function renderDashboardAgenda(leads) {
    const listContainer = document.getElementById("dashboard-agenda-list");
    const badge = document.getElementById("dashboard-agenda-badge");
    if (!listContainer) return;

    listContainer.innerHTML = "";

    // Filtrar leads que tengan citas programadas
    const meetingLeads = leads.filter(l => l.meeting);

    // Mapear con su fecha parseada safely
    const meetings = meetingLeads.map(lead => {
        let d = extractDateFromMeetingText(lead.meeting, lead.date);
        if (!d || isNaN(d.getTime())) {
            d = new Date(9999, 11, 31);
        }
        return { lead, date: d };
    }).sort((a, b) => a.date - b.date);

    // Filtrar para hoy y el futuro
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    
    // Filtramos las citas de hoy en adelante
    const activeMeetings = meetings.filter(m => m.date.getTime() >= todayStart);

    // Contar las de hoy específicamente
    const todayEnd = todayStart + (24 * 60 * 60 * 1000);
    const todayMeetings = activeMeetings.filter(m => m.date.getTime() >= todayStart && m.date.getTime() < todayEnd);

    if (badge) {
        badge.textContent = `${todayMeetings.length} Hoy`;
        if (todayMeetings.length > 0) {
            badge.style.backgroundColor = "var(--danger-light)";
            badge.style.color = "var(--danger)";
        } else {
            badge.style.backgroundColor = "var(--warning-light)";
            badge.style.color = "var(--warning)";
        }
    }

    // Tomar las primeras 5 citas
    const displayMeetings = activeMeetings.slice(0, 5);

    if (displayMeetings.length === 0) {
        listContainer.innerHTML = `
            <div class="agenda-list-empty">
                No hay citas programadas para este mes.
            </div>
        `;
        return;
    }

    displayMeetings.forEach(item => {
        const lead = item.lead;
        const meetingTime = item.date;
        const isToday = meetingTime.getTime() >= todayStart && meetingTime.getTime() < todayEnd;
        
        const card = document.createElement("div");
        card.className = `agenda-card-item ${isToday ? 'today' : ''}`;
        card.style.cursor = "pointer";
        card.onclick = () => openEditLeadModal(lead.id);

        const nameStr = String(lead.name || "").trim();
        const displayTitle = (nameStr && nameStr.toLowerCase() !== "sin nombre") 
            ? `${lead.phone} (${nameStr})` 
            : lead.phone;
        
        card.innerHTML = `
            <div class="agenda-item-header">
                <span class="agenda-client-name" title="${lead.name}">${displayTitle}</span>
                <span class="agenda-time-badge">
                    <i data-lucide="clock" style="width:12px; height:12px;"></i> ${lead.meeting}
                </span>
            </div>
            <div class="agenda-item-footer">
                <span class="card-line-tag ${lead.line}" style="font-size:0.65rem;">
                    ${lead.line === 'contabilidad' ? 'Contabilidad' : 'Sistemas'}
                </span>
                <button class="agenda-whatsapp-btn" onclick="event.stopPropagation(); window.open('https://wa.me/${String(lead.phone || "").replace(/[^0-9+]/g, '')}', '_blank')">
                    <i data-lucide="message-square" style="width:10px; height:10px;"></i> WhatsApp
                </button>
            </div>
        `;
        listContainer.appendChild(card);
    });

    lucide.createIcons();
}

function switchToKanbanView() {
    document.getElementById("nav-kanban").click();
}

// --- VIEW 2: KANBAN BOARD RENDERER (DRAG & DROP SUPPORT) ---
function renderKanban(leads) {
    const kanban = document.getElementById("kanban-board");
    if (!kanban) return;
    
    kanban.innerHTML = "";

    FUNNEL_STAGES.forEach(stage => {
        const columnLeads = leads.filter(l => l.stage === stage.id);
        
        const column = document.createElement("div");
        column.className = `kanban-column ${stage.id.replace('_', '-')}`;
        column.setAttribute("data-stage", stage.id);
        
        // Header
        column.innerHTML = `
            <div class="kanban-column-header">
                <span class="column-title"><i data-lucide="${stage.icon}"></i> ${stage.label}</span>
                <span class="column-counter">${columnLeads.length}</span>
            </div>
            <div class="kanban-cards-container" id="cards-container-${stage.id}">
                <!-- Cards filled here -->
            </div>
        `;
        kanban.appendChild(column);
        
        const cardsContainer = column.querySelector(".kanban-cards-container");
        
        // Drag & Drop event listeners for columns
        cardsContainer.addEventListener("dragover", e => {
            e.preventDefault();
            column.classList.add("dragover");
        });

        cardsContainer.addEventListener("dragleave", () => {
            column.classList.remove("dragover");
        });

        cardsContainer.addEventListener("drop", e => {
            e.preventDefault();
            column.classList.remove("dragover");
            const leadId = e.dataTransfer.getData("text/plain");
            moveLeadStage(leadId, stage.id);
        });

        // Fill Cards
        if (columnLeads.length === 0) {
            // empty column hint
            return;
        }

        columnLeads.forEach(lead => {
            const card = document.createElement("div");
            const daysInactive = getDaysSinceLastUpdate(lead);
            const isInactive = lead.stage !== "ganado" && lead.stage !== "perdido" && daysInactive >= 3;
            card.className = isInactive ? "kanban-card inactivity-warning-border" : "kanban-card";
            card.setAttribute("draggable", "true");
            card.setAttribute("data-id", lead.id);

            // Drag Start
            card.addEventListener("dragstart", e => {
                e.dataTransfer.setData("text/plain", lead.id);
                card.classList.add("dragging");
                setTimeout(() => card.style.opacity = "0.4", 0);
            });

            // Drag End
            card.addEventListener("dragend", () => {
                card.classList.remove("dragging");
                card.style.opacity = "1";
            });

            // Lost Reason sub-badge
            let lostReasonHTML = "";
            if (lead.stage === "perdido" && lead.lostReason) {
                lostReasonHTML = `<div class="card-lost-badge"><i data-lucide="alert-circle"></i> ${LOST_REASONS[lead.lostReason]}</div>`;
            }

            // Budget HTML badge if exists
            let budgetHTML = "";
            if (lead.budget) {
                budgetHTML = `<div class="card-budget-badge" style="font-size: 0.72rem; font-weight: 700; color: var(--success); background-color: var(--success-light); padding: 3px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 3px;"><i data-lucide="dollar-sign" style="width:11px; height:11px;"></i> ${lead.budget}</div>`;
            }

            // Scheduled Action / Meeting HTML badge if exists
            let meetingHTML = "";
            if (lead.meeting) {
                meetingHTML = `<div class="card-meeting-badge" style="font-size: 0.72rem; font-weight: 700; color: var(--warning); background-color: var(--warning-light); padding: 3px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 3px; border: 1px dashed rgba(217, 119, 6, 0.3);"><i data-lucide="calendar" style="width:11px; height:11px;"></i> ${lead.meeting}</div>`;
            }

            // Inactivity Warning Badge if lead is inactive in non-final stages
            let inactivityHTML = "";
            if (lead.stage !== "ganado" && lead.stage !== "perdido") {
                const daysInactive = getDaysSinceLastUpdate(lead);
                if (daysInactive >= 3) {
                    inactivityHTML = `<div class="card-warning-badge" style="font-size: 0.7rem; font-weight: 700; color: var(--danger); background-color: var(--danger-light); padding: 3px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 3px; border: 1px solid rgba(220, 38, 38, 0.15);" title="Sin contacto desde hace ${daysInactive} días"><i data-lucide="clock" style="width:11px; height:11px;"></i> ¡${daysInactive}d inactivo!</div>`;
                }
            }

            let badgesContainerHTML = "";
            if (budgetHTML || meetingHTML || inactivityHTML) {
                badgesContainerHTML = `<div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; margin-bottom: 6px;">${budgetHTML}${meetingHTML}${inactivityHTML}</div>`;
            }

            card.innerHTML = `
                <div class="card-top">
                    <span class="card-line-tag ${lead.line}">${lead.line === 'contabilidad' ? 'Contabilidad' : 'Sistemas'}</span>
                    <span class="card-date">${lead.date.slice(5)}</span>
                </div>
                <h4 class="card-name" title="${lead.name}">${lead.name}</h4>
                <div class="card-phone">
                    <i data-lucide="phone"></i> ${lead.phone}
                </div>
                ${lostReasonHTML}
                ${badgesContainerHTML}
                <div class="card-snippet" title="${lead.snippet || 'Sin comentarios'}">
                    ${lead.snippet || '<i>Sin comentarios</i>'}
                </div>
                <div class="card-actions">
                    <button class="card-btn" onclick="openEditLeadModal('${lead.id}')" title="Editar / Comentar"><i data-lucide="edit-3" style="width: 14px; height: 14px;"></i></button>
                    <button class="card-btn btn-whatsapp-send" onclick="openTemplatesForLead('${lead.id}')" title="WhatsApp Templates"><i data-lucide="message-square" style="width: 14px; height: 14px;"></i></button>
                    <button class="card-btn" onclick="quickMoveLead('${lead.id}')" title="Avanzar etapa"><i data-lucide="arrow-right-circle" style="width: 14px; height: 14px; color: var(--primary);"></i></button>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
    });
}

// --- VIEW 3: CLIENT LIST TABLE RENDERER ---
function renderClientList(leads) {
    const listBody = document.getElementById("clients-list-tbody");
    if (!listBody) return;

    listBody.innerHTML = "";

    const searchVal = document.getElementById("client-search-input").value.toLowerCase().trim();
    const stageVal = document.getElementById("filter-stage-select").value;
    const dateVal = document.getElementById("filter-date-input") ? document.getElementById("filter-date-input").value : "";

    const baseLeads = searchVal ? state.leads : leads;
    const filtered = baseLeads.filter(lead => {
        if (searchVal && state.activeLine !== "all" && lead.line !== state.activeLine) {
            return false;
        }
        
        const matchStage = 
            stageVal === "all" ? true :
            stageVal === "active_only" ? (lead.stage !== "ganado" && lead.stage !== "perdido") :
            stageVal === "no_lost" ? (lead.stage !== "perdido") :
            lead.stage === stageVal;
            
        const matchDate = searchVal ? true : (!dateVal || lead.date === dateVal);
        
        let matchSearch = true;
        if (searchVal) {
            const nameStr = String(lead.name || "").toLowerCase();
            const phoneStr = String(lead.phone || "").toLowerCase();
            const snippetStr = String(lead.snippet || "").toLowerCase();
            
            // Standard text match (name, phone, last snippet)
            let isMatched = nameStr.includes(searchVal) || 
                             phoneStr.includes(searchVal) || 
                             snippetStr.includes(searchVal);
            
            // Also check entire history text
            if (!isMatched && lead.history) {
                isMatched = lead.history.some(h => String(h.text || "").toLowerCase().includes(searchVal));
            }
                             
            // Phone digit-only match (ignores spaces, hyphens, etc. in phone and history)
            const cleanSearchVal = searchVal.replace(/[^\d]/g, "");
            if (cleanSearchVal.length > 0) {
                const cleanPhoneStr = phoneStr.replace(/[^\d]/g, "");
                if (cleanPhoneStr.includes(cleanSearchVal)) {
                    isMatched = true;
                } else if (lead.history) {
                    isMatched = isMatched || lead.history.some(h => {
                        const cleanHistText = String(h.text || "").replace(/[^\d]/g, "");
                        return cleanHistText.includes(cleanSearchVal);
                    });
                }
            }
            matchSearch = isMatched;
        }

        return matchStage && matchSearch && matchDate;
    });

    // Update statistics bar
    const avgEl = document.getElementById("clients-avg-per-day");
    if (avgEl) {
        const uniqueDays = new Set(leads.map(l => l.date));
        const avgPerDay = uniqueDays.size > 0 ? (leads.length / uniqueDays.size).toFixed(1) : "0.0";
        avgEl.textContent = avgPerDay;
    }
    
    const countBadge = document.getElementById("clients-filter-count-badge");
    if (countBadge) {
        countBadge.textContent = `Cargados: ${filtered.length} clientes`;
    }

    if (filtered.length === 0) {
        listBody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-secondary); padding: 40px 0;">No se encontraron clientes con los filtros aplicados.</td></tr>`;
        return;
    }

    filtered.forEach(lead => {
        const tr = document.createElement("tr");
        const daysInactive = getDaysSinceLastUpdate(lead);
        const isInactive = lead.stage !== "ganado" && lead.stage !== "perdido" && daysInactive >= 3;
        if (isInactive) {
            tr.className = "client-row-warning";
        }
        
        let lostReasonText = "";
        if (lead.stage === "perdido" && lead.lostReason) {
            lostReasonText = ` <small style="display:block; color: var(--danger); font-weight:700;">Motivo: ${LOST_REASONS[lead.lostReason]}</small>`;
        }

        let inactivityAlertText = "";
        if (lead.stage !== "ganado" && lead.stage !== "perdido") {
            const daysInactive = getDaysSinceLastUpdate(lead);
            if (daysInactive >= 3) {
                inactivityAlertText = `<span style="display:inline-flex; align-items:center; gap:2px; font-size:0.7rem; font-weight:700; color:var(--danger); background-color:var(--danger-light); padding:1px 4px; border-radius:3px; border:1px solid rgba(220, 38, 38, 0.15); margin-top:4px;" title="Sin contacto desde hace ${daysInactive} días"><i data-lucide="clock" style="width:9px; height:9px;"></i> Inactivo: ${daysInactive}d</span>`;
            }
        }

        tr.innerHTML = `
            <td><code style="font-size:0.75rem; font-weight:bold;">${lead.date}</code></td>
            <td>
                <div class="client-name-cell">
                    <span class="client-meta-title" style="font-weight:700; color:var(--text-primary);">${lead.name}</span>
                </div>
            </td>
            <td>
                <div style="display:flex; align-items:center; gap:6px;">
                    <a href="https://wa.me/${String(lead.phone || "").replace(/[^0-9+]/g, '')}" target="_blank" style="color: var(--success); font-weight:600; display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; background-color:var(--success-light); border:1px solid rgba(16,185,129,0.2); border-radius:var(--radius-sm);" title="Chatear en WhatsApp Web">
                        <i data-lucide="phone" style="width:13px; height:13px;"></i>
                    </a>
                    <span onclick="copyToClipboard('${lead.phone}', this)" style="cursor:pointer; font-weight:600; color:var(--text-primary); text-decoration:underline dashed rgba(255,255,255,0.15); text-underline-offset:3px; display:inline-block; min-width:85px;" title="Haz clic para copiar el celular">
                        ${lead.phone}
                    </span>
                </div>
            </td>
            <td>
                <span class="card-line-tag ${lead.line}">${lead.line === 'contabilidad' ? 'Contabilidad' : 'Sistemas'}</span>
            </td>
            <td>
                <span class="status-tag ${lead.stage}">${FUNNEL_STAGES.find(s => s.id === lead.stage).label}</span>
                ${lostReasonText}
                ${inactivityAlertText}
            </td>
            <td>
                ${lead.budget ? `<span style="font-size:0.8rem; font-weight:700; color:var(--success); display:inline-flex; align-items:center; gap:4px;"><i data-lucide="dollar-sign" style="width:12px; height:12px;"></i> ${lead.budget}</span>` : '<span style="color:var(--text-secondary); font-size:0.8rem;">-</span>'}
            </td>
            <td>
                ${lead.meeting ? `<span style="font-size:0.8rem; font-weight:700; color:var(--warning); background-color:var(--warning-light); padding:3px 6px; border-radius:4px; border:1px dashed rgba(217, 119, 6, 0.3); display:inline-flex; align-items:center; gap:4px;"><i data-lucide="calendar" style="width:12px; height:12px;"></i> ${lead.meeting}</span>` : '<span style="color:var(--text-secondary); font-size:0.8rem;">-</span>'}
            </td>
            <td>
                <div style="max-width: 250px; font-size:0.8rem; color:var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${lead.snippet || ''}">
                    ${lead.snippet || '<i>Sin comentarios</i>'}
                </div>
            </td>
            <td>
                <div class="card-actions" style="border:none; padding:0; justify-content: flex-start; gap:10px;">
                    <button class="card-btn" onclick="openEditLeadModal('${lead.id}')" title="Editar lead"><i data-lucide="edit-2" style="width: 15px; height: 15px;"></i></button>
                    <button class="card-btn btn-whatsapp-send" onclick="openTemplatesForLead('${lead.id}')" title="Respuestas de WhatsApp"><i data-lucide="message-square" style="width: 15px; height: 15px;"></i></button>
                    <button class="card-btn" onclick="deleteLeadConfirm('${lead.id}')" title="Eliminar" style="color:var(--danger);"><i data-lucide="trash-2" style="width: 15px; height: 15px;"></i></button>
                </div>
            </td>
        `;
        listBody.appendChild(tr);
    });
    
    // Refresh Lucide Icons for the newly added table rows
    if (window.lucide) {
        lucide.createIcons();
    }
}

// --- VIEW 4: TEMPLATES MANAGER RENDERER ---
function renderTemplateSection() {
    const listContainer = document.getElementById("template-buttons");
    const selectClient = document.getElementById("template-client-select");
    if (!listContainer || !selectClient) return;

    // Auto-heal empty templates object defensively
    if (!state.templates || !state.templates.contabilidad || !state.templates.sistemas) {
        state.templates = { ...DEFAULT_TEMPLATES };
        saveState();
    }

    // Determine the active line for templates
    let lineToUse = "contabilidad"; // Default
    const selLeadId = selectClient.value;
    
    if (selLeadId) {
        const leadObj = state.leads.find(l => l.id === selLeadId);
        if (leadObj && (leadObj.line === "contabilidad" || leadObj.line === "sistemas")) {
            lineToUse = leadObj.line;
        }
    } else {
        // Fallback to active global line filter if not "all", otherwise default to contabilidad
        if (state.activeLine === "sistemas") {
            lineToUse = "sistemas";
        }
    }

    // Load active buttons for the selected line
    listContainer.innerHTML = "";
    let activeKey = localStorage.getItem("mc_active_template_key") || "contacto_inicial";
    
    const lineTemplates = state.templates[lineToUse];
    if (!lineTemplates || !lineTemplates[activeKey]) {
        activeKey = (lineTemplates ? Object.keys(lineTemplates)[0] : null) || "contacto_inicial";
        localStorage.setItem("mc_active_template_key", activeKey);
    }

    Object.entries(lineTemplates || {}).forEach(([key, t]) => {
        const btn = document.createElement("button");
        btn.className = `template-btn ${key === activeKey ? 'active' : ''}`;
        btn.textContent = t.title;
        btn.onclick = () => {
            localStorage.setItem("mc_active_template_key", key);
            renderTemplateSection();
        };
        listContainer.appendChild(btn);
    });

    // Fill Simular con Cliente list
    const currentSimulatedId = selectClient.value;
    selectClient.innerHTML = `<option value="">-- Ninguno (Mensaje General) --</option>`;
    
    // Sort clients alphabetically for dropdown safely (casting to String to avoid TypeErrors)
    const sortedLeads = [...state.leads].sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
    sortedLeads.forEach(lead => {
        const opt = document.createElement("option");
        opt.value = lead.id;
        opt.textContent = `${lead.name} - ${lead.phone} (${lead.line === 'contabilidad' ? 'Contabilidad' : 'Sistemas'})`;
        if (lead.id === currentSimulatedId) opt.selected = true;
        selectClient.appendChild(opt);
    });

    // Render Editor Text
    const editor = document.getElementById("template-text-editor");
    const titleHeader = document.getElementById("active-template-title");
    const saveBtn = document.getElementById("btn-save-template-text");
    const noticeText = document.getElementById("template-notice-span");
    const template = lineTemplates ? lineTemplates[activeKey] : null;

    if (editor && template && titleHeader) {
        titleHeader.textContent = template.title;
        
        let clientName = "";
        let finalPhone = "";
        
        if (selLeadId) {
            const leadObj = state.leads.find(l => l.id === selLeadId);
            if (leadObj) {
                clientName = leadObj.name;
                finalPhone = leadObj.phone;
            }
        }

        // El editor SIEMPRE es editable para permitir personalizaciones antes de enviar/copiar
        editor.removeAttribute("readonly");
        if (saveBtn) saveBtn.style.display = "inline-flex";

        if (selLeadId === "") {
            // EDIT MODE FOR BASE TEMPLATE
            if (noticeText) {
                const lineLabel = lineToUse === "contabilidad" ? "Contabilidad" : "Sistemas / IT";
                noticeText.innerHTML = `📝 <strong>Modo Edición Plantilla Base (${lineLabel}):</strong> Puedes escribir y modificar el texto de esta plantilla libremente abajo. Usa <strong>[Nombre]</strong> para indicar dónde irá el nombre del cliente. Haz clic en <strong>Guardar Cambios</strong> para actualizarla en la nube.`;
            }
            editor.value = template.text;
            editor.setAttribute("data-text", template.text);
            editor.setAttribute("data-phone", "");
        } else {
            // PREVIEW & CUSTOMIZE MODE FOR SPECIFIC CLIENT
            if (noticeText) {
                noticeText.innerHTML = `📝 <strong>Personalizar Mensaje:</strong> Modifica libremente este mensaje para <strong>${clientName}</strong> antes de enviarlo. Si haces clic en <strong>Guardar Cambios</strong>, se actualizará la plantilla base reemplazando su nombre con [Nombre].`;
            }
            
            // Replace dinámicamente
            let textToShow = template.text;
            if (clientName) {
                textToShow = textToShow.replace(/\[Nombre\]/g, clientName);
            } else {
                textToShow = textToShow.replace(/\[Nombre\]/g, "Sr(a). Cliente");
            }

            editor.value = textToShow;
            editor.setAttribute("data-text", textToShow);
            editor.setAttribute("data-phone", finalPhone || "");
        }
    }
}

function openTemplatesForLead(leadId) {
    const lead = state.leads.find(l => l.id === leadId);
    if (!lead) return;

    // Change nav tab
    document.getElementById("nav-templates").click();

    // Set simulator dropdown
    const selectClient = document.getElementById("template-client-select");
    if (selectClient) {
        selectClient.value = leadId;
    }

    // Set active template matching their current stage if exists, otherwise fallback
    let matchKey = "";
    if (lead.stage === "contacto_inicial") matchKey = "contacto_inicial";
    else if (lead.stage === "asesoria") matchKey = "asesoria_cuestionario";
    else if (lead.stage === "cotizacion") matchKey = "cotizacion_propuesta";
    else if (lead.stage === "seguimiento") matchKey = "seguimiento";
    else if (lead.stage === "llamada") matchKey = "llamada_perdida";
    
    if (matchKey) {
        localStorage.setItem("mc_active_template_key", matchKey);
    }

    renderTemplateSection();
}

// --- STATE MODIFYING ACTIONS ---

// Move Lead Stage (from Kanban drag/drop or lists)
function moveLeadStage(id, newStage, reason = "") {
    const leadIndex = state.leads.findIndex(l => l.id === id);
    if (leadIndex === -1) return;

    const lead = state.leads[leadIndex];
    const prevStage = lead.stage;
    
    if (prevStage === newStage) return;

    // If moving to "perdido" and no reason provided, we show a prompt!
    if (newStage === "perdido" && !reason) {
        openLostReasonPrompt(id, (selectedReason) => {
            moveLeadStage(id, "perdido", selectedReason);
        }, () => {
            // Cancelled: revert card render
            renderApp();
        });
        return;
    }

    // Update
    lead.stage = newStage;
    lead.lostReason = newStage === "perdido" ? reason : "";
    
    const timeStr = getFormattedNow();
    lead.history.push({
        date: timeStr,
        text: `Etapa cambiada de "${FUNNEL_STAGES.find(s => s.id === prevStage).label}" a "${FUNNEL_STAGES.find(s => s.id === newStage).label}".` + (reason ? ` Motivo: ${LOST_REASONS[reason]}.` : ""),
        stageFrom: prevStage,
        stageTo: newStage
    });

    saveState();
    renderApp();
}

function quickMoveLead(id) {
    const lead = state.leads.find(l => l.id === id);
    if (!lead) return;

    const currentIndex = FUNNEL_STAGES.findIndex(s => s.id === lead.stage);
    if (currentIndex === -1 || currentIndex >= FUNNEL_STAGES.length - 2) {
        // Already Ganado or Perdido, or not found. Cannot advance
        alert(`El lead ya está en fase final: "${FUNNEL_STAGES[currentIndex].label}".`);
        return;
    }

    const nextStage = FUNNEL_STAGES[currentIndex + 1].id;
    moveLeadStage(id, nextStage);
}

// Prompt for lost reason when dragging cards
function openLostReasonPrompt(leadId, onConfirm, onCancel) {
    const lead = state.leads.find(l => l.id === leadId);
    if (!lead) return;

    // Dynamic clean prompt creation
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop active";
    backdrop.style.zIndex = "110"; // higher than other modals
    
    backdrop.innerHTML = `
        <div class="modal-card modal-small" style="margin-top: 15vh;">
            <div class="modal-header">
                <h3>Indicar Motivo de Pérdida</h3>
            </div>
            <div class="modal-body">
                <p class="description-text">Por favor, selecciona por qué motivo se perdió el cliente <strong>"${lead.name}"</strong> para alimentar las estadísticas de ventas:</p>
                <div class="form-group">
                    <select id="prompt-lost-reason-select" class="form-input" required>
                        <option value="no_responde">No responde / WhatsApp Fantasma</option>
                        <option value="precio_alto">Precio muy elevado</option>
                        <option value="sin_interes">Sin interés / Desistió del servicio</option>
                        <option value="competencia">Se fue con la competencia</option>
                        <option value="otros" selected>Otros motivos / No especificado</option>
                    </select>
                </div>
                <div class="modal-footer" style="padding-top: 10px; border-top: none;">
                    <button class="btn-secondary" id="prompt-lost-cancel">Cancelar</button>
                    <button class="btn-primary" id="prompt-lost-confirm">Guardar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(backdrop);
    
    document.getElementById("prompt-lost-confirm").onclick = () => {
        const reason = document.getElementById("prompt-lost-reason-select").value;
        backdrop.remove();
        onConfirm(reason);
    };

    document.getElementById("prompt-lost-cancel").onclick = () => {
        backdrop.remove();
        if (onCancel) onCancel();
    };
}

// Delete Lead Confirm
function deleteLeadConfirm(id) {
    const lead = state.leads.find(l => l.id === id);
    if (!lead) return;

    if (confirm(`¿Estás seguro de que deseas eliminar al cliente "${lead.name}"?\n\n🔄 Se moverá a la Papelera de Reciclaje. Podrás recuperarlo en cualquier momento desde la pestaña "Respaldos y Datos".`)) {
        state.deletedLeads = state.deletedLeads || [];
        if (!state.deletedLeads.includes(id)) {
            state.deletedLeads.push(id);
        }
        
        state.trash = state.trash || [];
        const deletedLead = { ...lead, deletedAt: new Date().toISOString() };
        state.trash.push(deletedLead);

        state.leads = state.leads.filter(l => l.id !== id);
        saveState();
        renderApp();
        renderTrashList();
    }
}

// --- INTELLIGENT WHATSAPP NOTES ANALYZER ENGINE ---
function analyzeCommentText(text) {
    if (!text) return null;
    
    const normalizedText = text.toLowerCase().trim();
    if (normalizedText.length === 0) return null;

    let bestMatch = null;
    let maxMatchedKeywords = 0;

    AI_RULES.forEach(rule => {
        let matches = 0;
        rule.keywords.forEach(kw => {
            if (normalizedText.includes(kw)) {
                matches++;
            }
        });

        if (matches > maxMatchedKeywords) {
            maxMatchedKeywords = matches;
            bestMatch = rule;
        }
    });

    if (bestMatch && maxMatchedKeywords > 0) {
        return {
            stage: bestMatch.stage,
            reason: bestMatch.reason || ""
        };
    }

    return null;
}

// Trigger analyzer display
function handleNotesAnalyzer() {
    const noteArea = document.getElementById("client-whatsapp-note");
    const badge = document.getElementById("ai-suggestion-badge");
    const suggestionText = document.getElementById("ai-suggestion-text");
    
    if (!noteArea || !badge || !suggestionText) return;

    const result = analyzeCommentText(noteArea.value);
    
    if (result) {
        const stageLabel = FUNNEL_STAGES.find(s => s.id === result.stage).label;
        let finalLabel = stageLabel;
        if (result.stage === "perdido" && result.reason) {
            finalLabel += ` (${LOST_REASONS[result.reason]})`;
        }
        
        suggestionText.textContent = finalLabel;
        badge.style.display = "inline-flex";
        
        // Attach click action to automatically update the form dropdown!
        badge.onclick = () => {
            const formStage = document.getElementById("client-stage");
            formStage.value = result.stage;
            formStage.dispatchEvent(new Event("change")); // trigger visibility change for lost reasons
            
            if (result.stage === "perdido" && result.reason) {
                const formReason = document.getElementById("client-lost-reason");
                formReason.value = result.reason;
            }
            
            badge.style.display = "none";
        };
    } else {
        badge.style.display = "none";
    }

    // Auto date/time detection from note textarea (Interactive Badge Suggestion)
    const dateBadge = document.getElementById("ai-date-suggestion-badge");
    const dateSuggestionText = document.getElementById("ai-date-suggestion-text");
    
    if (dateBadge && dateSuggestionText) {
        const extracted = extractDateTimeFromSpanishText(noteArea.value);
        if (extracted) {
            // Formatear visualmente la sugerencia (ej. "02/06/2026 a las 15:00")
            const parts = extracted.date.split('-');
            const displayDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : extracted.date;
            dateSuggestionText.textContent = `${displayDate} a las ${extracted.time}`;
            dateBadge.style.display = "inline-flex";
            
            // Acción click al hacer clic en el badge para aplicar los valores de forma segura
            dateBadge.onclick = () => {
                const meetingDateInput = document.getElementById("client-meeting-date");
                const meetingTimeInput = document.getElementById("client-meeting-time");
                
                if (extracted.dateFound && meetingDateInput) {
                    meetingDateInput.value = extracted.date;
                }
                if (extracted.timeFound && meetingTimeInput) {
                    meetingTimeInput.value = extracted.time;
                }
                
                // Trigger reactively to update the Google Calendar link in the modal
                if (typeof updateMeetingFromInputs === "function") {
                    updateMeetingFromInputs();
                }
                
                // Ocultar badge tras aplicar
                dateBadge.style.display = "none";
            };
        } else {
            dateBadge.style.display = "none";
        }
    }
}

// --- EXTRAER FECHA Y HORA DE TEXTO EN ESPAÑOL ---
function extractDateTimeFromSpanishText(text) {
    if (!text) return null;
    const normalized = text.toLowerCase().trim();
    
    let dateObj = new Date();
    let dateFound = false;
    let timeFound = false;
    
    let hours = 9;
    let minutes = 0;
    
    if (normalized.includes("mañana")) {
        dateObj.setDate(dateObj.getDate() + 1);
        dateFound = true;
    } else if (normalized.includes("pasado mañana")) {
        dateObj.setDate(dateObj.getDate() + 2);
        dateFound = true;
    } else if (normalized.includes("hoy")) {
        dateFound = true;
    }
    
    const monthsSpanish = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    
    const explicitDateMatch = normalized.match(/(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i);
    if (explicitDateMatch) {
        const day = parseInt(explicitDateMatch[1]);
        const monthName = explicitDateMatch[2].toLowerCase();
        const monthIdx = monthsSpanish.indexOf(monthName);
        if (monthIdx !== -1) {
            dateObj.setMonth(monthIdx);
            dateObj.setDate(day);
            dateFound = true;
        }
    } else {
        const slashMatch = normalized.match(/(\d{1,2})[-/](\d{1,2})[-/](\d{4})/) || normalized.match(/(\d{1,2})[-/](\d{1,2})/);
        if (slashMatch) {
            const day = parseInt(slashMatch[1]);
            const month = parseInt(slashMatch[2]) - 1;
            if (slashMatch[3]) {
                const year = parseInt(slashMatch[3]);
                dateObj = new Date(year, month, day);
            } else {
                dateObj.setMonth(month);
                dateObj.setDate(day);
            }
            dateFound = true;
        }
    }
    
    const timeMatch = normalized.match(/(\d{1,2})[.:](\d{2})\s*(am|pm)?/i) || normalized.match(/(\d{1,2})\s*(am|pm)/i) || normalized.match(/a\s+las\s+(\d{1,2})/i);
    if (timeMatch) {
        if (normalized.includes("a las") && !timeMatch[2] && !timeMatch[3]) {
            const matchLas = normalized.match(/a\s+las\s+(\d{1,2})/i);
            if (matchLas) {
                hours = parseInt(matchLas[1]);
                if (hours >= 1 && hours <= 7) hours += 12; 
                timeFound = true;
            }
        } else {
            hours = parseInt(timeMatch[1]);
            minutes = timeMatch[2] && !isNaN(parseInt(timeMatch[2])) ? parseInt(timeMatch[2]) : 0;
            const ampm = timeMatch[3] ? timeMatch[3].toLowerCase() : "";
            
            if (ampm === "pm" && hours < 12) hours += 12;
            if (ampm === "am" && hours === 12) hours = 0;
            if (!ampm && hours >= 1 && hours <= 7) hours += 12;
            
            timeFound = true;
        }
    }
    
    if (dateFound || timeFound) {
        const yyyy = dateObj.getFullYear();
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const dd = String(dateObj.getDate()).padStart(2, '0');
        return {
            date: `${yyyy}-${mm}-${dd}`,
            time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
            dateFound,
            timeFound
        };
    }
    
    return null;
}

// --- MODALS ACTIONS ---

// Open Add Client Form
function openAddLeadModal() {
    // Reset form
    document.getElementById("client-form").reset();
    document.getElementById("client-id").value = "";
    document.getElementById("modal-client-title").textContent = "Añadir Nuevo Cliente";
    
    // Set default date using local timezone
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    document.getElementById("client-date").value = `${yyyy}-${mm}-${dd}`;
    document.getElementById("client-date").disabled = false;
    
    // Clear pickers
    document.getElementById("client-meeting-date").value = "";
    document.getElementById("client-meeting-time").value = "";
    
    // Populate months dropdown in form
    renderMonthSelectors();
    document.getElementById("client-month-select").value = state.activeMonth;
    document.getElementById("client-month-select").disabled = false;

    // Trigger stages toggle
    document.getElementById("client-stage").value = "contacto_inicial";
    document.getElementById("group-lost-reason").style.display = "none";
    
    // Hide Timeline and AI suggestions
    document.getElementById("client-timeline-box").style.display = "none";
    document.getElementById("ai-suggestion-badge").style.display = "none";
    document.getElementById("google-calendar-sync-container").style.display = "none";

    // Show modal
    document.getElementById("modal-client").classList.add("active");
    
    // Auto-focus name field
    setTimeout(() => document.getElementById("client-name").focus(), 100);
}

// Open Edit Client Form
function openEditLeadModal(id) {
    const lead = state.leads.find(l => l.id === id);
    if (!lead) return;

    document.getElementById("modal-client-title").textContent = "Editar Cliente / Propuesta";
    document.getElementById("client-id").value = lead.id;
    document.getElementById("client-name").value = lead.name;
    document.getElementById("client-phone").value = lead.phone;
    document.getElementById("client-line").value = lead.line;
    document.getElementById("client-stage").value = lead.stage;
    document.getElementById("client-date").value = lead.date;
    document.getElementById("client-date").disabled = false;
    document.getElementById("client-budget").value = lead.budget || "";
    
    // Parse meeting date & time from lead.meeting (e.g. "2026-06-02 17:00")
    let meetingDate = "";
    let meetingTime = "";
    if (lead.meeting) {
        const isoDateTimeMatch = lead.meeting.match(/^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})/);
        if (isoDateTimeMatch) {
            meetingDate = isoDateTimeMatch[1];
            meetingTime = isoDateTimeMatch[2];
        } else {
            // Fallback: parse legacy free text meeting values
            const parsed = extractDateFromMeetingText(lead.meeting, lead.date);
            if (parsed) {
                const pyyyy = parsed.getFullYear();
                const pmm = String(parsed.getMonth() + 1).padStart(2, '0');
                const pdd = String(parsed.getDate()).padStart(2, '0');
                meetingDate = `${pyyyy}-${pmm}-${pdd}`;
                const hourMatch = lead.meeting.match(/(\d{1,2})[.:](\d{2})\s*(am|pm)?/i) || lead.meeting.match(/(\d{1,2})\s*(am|pm)/i);
                if (hourMatch) {
                    let hours = parseInt(hourMatch[1]);
                    const minutes = hourMatch[2] && !isNaN(parseInt(hourMatch[2])) ? String(parseInt(hourMatch[2])).padStart(2, '0') : "00";
                    const ampm = hourMatch[3] ? hourMatch[3].toLowerCase() : "";
                    if (ampm === "pm" && hours < 12) hours += 12;
                    if (ampm === "am" && hours === 12) hours = 0;
                    meetingTime = `${String(hours).padStart(2, '0')}:${minutes}`;
                }
            }
        }
    }
    
    document.getElementById("client-meeting-date").value = meetingDate;
    document.getElementById("client-meeting-time").value = meetingTime;
    
    // Fill Month and select active
    renderMonthSelectors();
    document.getElementById("client-month-select").value = lead.month;
    document.getElementById("client-month-select").disabled = false;

    // Lost Reasons block toggle
    const lostReasonGroup = document.getElementById("group-lost-reason");
    if (lead.stage === "perdido") {
        lostReasonGroup.style.display = "block";
        document.getElementById("client-lost-reason").value = lead.lostReason || "otros";
    } else {
        lostReasonGroup.style.display = "none";
        document.getElementById("client-lost-reason").value = "";
    }

    // Comment clear (it is treated as new history observation)
    document.getElementById("client-whatsapp-note").value = "";
    document.getElementById("ai-suggestion-badge").style.display = "none";

    // Show Comments Timeline
    renderModalTimeline(lead);

    // Update Calendar sync button URL reactively
    updateGoogleCalendarButton(lead);

    // Show modal
    document.getElementById("modal-client").classList.add("active");
}

// Renderiza el historial de comentarios del cliente en el modal de edición
function renderModalTimeline(lead) {
    const timelineBox = document.getElementById("client-timeline-box");
    const timelineItems = document.getElementById("client-timeline-items");
    if (!timelineBox || !timelineItems) return;

    // Ensure history exists
    lead.history = lead.history || [];

    if (lead.history.length > 0) {
        timelineItems.innerHTML = "";
        
        // Map history entries with their original index
        const historyWithIndex = lead.history.map((h, index) => ({ ...h, index }));
        
        // Reverse history order (newest first in popup)
        const reversedHistory = [...historyWithIndex].reverse();
        
        reversedHistory.forEach(item => {
            const div = document.createElement("div");
            div.className = "timeline-item";
            div.innerHTML = `
                <div class="timeline-meta" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
                    <span style="font-size:0.75rem; color:var(--text-secondary); font-weight:600;">${item.date}</span>
                    <div class="timeline-actions" style="display:inline-flex; gap:6px;">
                        <button type="button" class="icon-btn-secondary" onclick="editHistoryItem('${lead.id}', ${item.index})" title="Editar comentario" style="padding:4px; border:1px solid var(--border-color); background:var(--bg-hover); border-radius:var(--radius-sm); cursor:pointer; display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px;">
                            <i data-lucide="edit-2" style="width:12px; height:12px; color:var(--text-secondary);"></i>
                        </button>
                        <button type="button" class="icon-btn-secondary" onclick="deleteHistoryItem('${lead.id}', ${item.index})" title="Eliminar comentario" style="padding:4px; border:1px solid var(--border-color); background:var(--bg-hover); border-radius:var(--radius-sm); cursor:pointer; display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px;">
                            <i data-lucide="trash-2" style="width:12px; height:12px; color:var(--danger);"></i>
                        </button>
                    </div>
                </div>
                <div class="timeline-content" style="font-size:0.82rem; color:var(--text-primary); margin-top:4px; white-space:pre-wrap; word-break:break-word;">${item.text}</div>
            `;
            timelineItems.appendChild(div);
        });
        
        timelineBox.style.display = "block";
        lucide.createIcons();
    } else {
        timelineBox.style.display = "none";
    }
}

// Edita un comentario específico del historial
window.editHistoryItem = function(leadId, historyIndex) {
    const lead = state.leads.find(l => l.id === leadId);
    if (!lead || !lead.history || !lead.history[historyIndex]) return;

    const oldText = lead.history[historyIndex].text;
    const newText = prompt("Editar comentario del historial:", oldText);
    if (newText === null) return; // Cancelado por el usuario
    
    const trimmed = newText.trim();
    if (!trimmed) {
        alert("El comentario no puede quedar vacío. Si deseas quitarlo, usa la opción de eliminar.");
        return;
    }

    lead.history[historyIndex].text = trimmed;
    
    // Si era el último comentario, actualizamos el snippet (observación principal)
    if (historyIndex === lead.history.length - 1) {
        lead.snippet = trimmed;
    }

    saveState();
    renderModalTimeline(lead);
    renderApp(); // actualiza las tablas del dashboard / lista en segundo plano
};

// Elimina un comentario específico del historial
window.deleteHistoryItem = function(leadId, historyIndex) {
    const lead = state.leads.find(l => l.id === leadId);
    if (!lead || !lead.history || !lead.history[historyIndex]) return;

    if (confirm("¿Estás seguro de que deseas eliminar permanentemente este comentario del historial?")) {
        lead.history.splice(historyIndex, 1);
        
        // Si borramos todo el historial o quedan elementos, actualizamos el snippet
        if (lead.history.length > 0) {
            lead.snippet = lead.history[lead.history.length - 1].text;
        } else {
            lead.snippet = "Cliente registrado.";
        }

        saveState();
        renderModalTimeline(lead);
        renderApp(); // actualiza las tablas del dashboard / lista en segundo plano
    }
};

// Submit Client Form
function handleClientFormSubmit() {
    const id = document.getElementById("client-id").value;
    const name = document.getElementById("client-name").value.trim();
    const phone = document.getElementById("client-phone").value.trim();
    const line = document.getElementById("client-line").value;
    const stage = document.getElementById("client-stage").value;
    const lostReason = stage === "perdido" ? document.getElementById("client-lost-reason").value : "";
    const date = document.getElementById("client-date").value;
    const month = document.getElementById("client-month-select").value;
    const budget = document.getElementById("client-budget").value.trim();
    
    // Retrieve and combine Date & Time pickers
    const meetingDateVal = document.getElementById("client-meeting-date").value;
    const meetingTimeVal = document.getElementById("client-meeting-time").value;
    let meeting = "";
    if (meetingDateVal) {
        meeting = meetingDateVal + (meetingTimeVal ? " " + meetingTimeVal : " 00:00");
    }
    
    const newNote = document.getElementById("client-whatsapp-note").value.trim();

    if (!name || !phone) {
        alert("Por favor rellene los campos obligatorios (*) del cliente.");
        return;
    }

    const timeNow = getFormattedNow();

    if (id) {
        // EDIT MODE
        const lead = state.leads.find(l => l.id === id);
        if (!lead) return;

        // Ensure no other lead has the same phone number in the target month
        const digitsOnly = phone.replace(/[^\d]/g, "");
        const cleanPhone = digitsOnly.length >= 9 ? digitsOnly.slice(-9) : digitsOnly;
        
        const isDuplicate = state.leads.some(l => {
            if (l.id === id) return false;
            const lDigits = (l.phone || "").replace(/[^\d]/g, "");
            const lClean = lDigits.length >= 9 ? lDigits.slice(-9) : lDigits;
            return lClean === cleanPhone && l.month === month;
        });

        if (isDuplicate) {
            alert(`Error: El número de teléfono "${phone}" ya está registrado en el mes "${month}".`);
            return;
        }

        // Ensure history array exists
        lead.history = lead.history || [];

        const prevStage = lead.stage;

        lead.name = name;
        lead.phone = phone;
        lead.line = line;
        lead.stage = stage;
        lead.lostReason = lostReason;
        lead.date = date;
        lead.month = month;
        lead.budget = budget;
        lead.meeting = meeting;

        // If a new comment was typed, add to history and update lead snippet
        if (newNote) {
            lead.snippet = newNote;
            lead.history.push({
                date: timeNow,
                text: newNote,
                stageFrom: prevStage,
                stageTo: stage
            });
        }

        // If stage changed without a note text, auto push history log
        if (prevStage !== stage) {
            lead.history.push({
                date: timeNow,
                text: `Etapa cambiada de "${FUNNEL_STAGES.find(s => s.id === prevStage).label}" a "${FUNNEL_STAGES.find(s => s.id === stage).label}".` + (lostReason ? ` Motivo: ${LOST_REASONS[lostReason]}.` : ""),
                stageFrom: prevStage,
                stageTo: stage
            });
        }
    } else {
        // CREATE MODE
        const digitsOnly = phone.replace(/[^\d]/g, "");
        const cleanPhone = digitsOnly.length >= 9 ? digitsOnly.slice(-9) : digitsOnly;
        
        const isDuplicate = state.leads.some(l => {
            const lDigits = (l.phone || "").replace(/[^\d]/g, "");
            const lClean = lDigits.length >= 9 ? lDigits.slice(-9) : lDigits;
            return lClean === cleanPhone && l.month === month;
        });

        if (isDuplicate) {
            alert(`Error: El número de teléfono "${phone}" ya está registrado en el mes "${month}".`);
            return;
        }

        const newLead = {
            id: "lead_" + Date.now(),
            name,
            phone,
            line,
            stage,
            lostReason,
            date,
            month,
            budget,
            meeting,
            snippet: newNote || "Cliente registrado.",
            history: [
                {
                    date: timeNow,
                    text: newNote ? `Cliente registrado. Nota: ${newNote}` : "Cliente registrado en el CRM.",
                    stageFrom: "",
                    stageTo: stage
                }
            ]
        };

        // If lost, check reason
        if (stage === "perdido" && lostReason) {
            newLead.history[0].text += ` Motivo de pérdida: ${LOST_REASONS[lostReason]}.`;
        }

        state.leads.push(newLead);
    }

    saveState();
    document.getElementById("modal-client").classList.remove("active");
    renderApp();
}

// --- MONTH CREATION FORM ACTIONS ---
function handleMonthFormSubmit() {
    const monthName = document.getElementById("new-month-name").value.trim();
    if (!monthName) return;

    if (state.months.includes(monthName)) {
        alert("Este mes ya existe en la base de datos.");
        return;
    }

    state.deletedMonths = (state.deletedMonths || []).filter(m => m !== monthName);
    state.months.push(monthName);
    state.activeMonth = monthName; // set active on creation
    
    saveState();
    document.getElementById("modal-month").classList.remove("active");
    renderApp();
}

// Render dynamic month list for administration inside the modal
function renderMonthsManagementList() {
    const listContainer = document.getElementById("months-management-list");
    if (!listContainer) return;
    
    listContainer.innerHTML = "";
    
    state.months.forEach(month => {
        const row = document.createElement("div");
        row.className = "month-mgmt-row";
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.justifyContent = "space-between";
        row.style.padding = "8px 12px";
        row.style.backgroundColor = "var(--bg-hover)";
        row.style.borderRadius = "var(--radius-sm)";
        row.style.border = "1px solid var(--border-color)";
        
        // Count leads in this month
        const leadsCount = state.leads.filter(l => l.month === month).length;
        
        row.innerHTML = `
            <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                <i data-lucide="calendar" style="width:14px; height:14px; color:var(--primary);"></i> ${month} 
                <small style="font-weight: normal; color: var(--text-secondary); font-size:0.75rem;">(${leadsCount} clientes)</small>
            </span>
            <div style="display: flex; gap: 6px;">
                <button class="card-btn" onclick="promptRenameMonth('${month}')" title="Renombrar mes" style="padding: 4px 8px; border:1px solid var(--border-color);"><i data-lucide="edit-2" style="width: 14px; height: 14px;"></i></button>
                <button class="card-btn" onclick="confirmDeleteMonth('${month}')" title="Eliminar mes" style="padding: 4px 8px; color: var(--danger); border:1px solid var(--border-color);"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
            </div>
        `;
        listContainer.appendChild(row);
    });
    
    lucide.createIcons();
}

// Rename a month with full cascading updates to its registered leads
function promptRenameMonth(oldName) {
    const newName = prompt(`Ingresa el nuevo nombre para el mes "${oldName}":`, oldName);
    if (newName === null) return; // Cancelled
    const trimmed = newName.trim();
    if (!trimmed) {
        alert("El nombre del mes no puede estar vacío.");
        return;
    }
    if (trimmed !== oldName && state.months.includes(trimmed)) {
        alert("Ya existe un mes con ese nombre.");
        return;
    }
    
    // Remove new name from deletedMonths if it was previously marked as deleted
    state.deletedMonths = (state.deletedMonths || []).filter(m => m !== trimmed);
    
    // Rename in months list
    const idx = state.months.indexOf(oldName);
    if (idx !== -1) {
        state.months[idx] = trimmed;
    }
    
    // Update leads
    let updatedCount = 0;
    state.leads.forEach(lead => {
        if (lead.month === oldName) {
            lead.month = trimmed;
            updatedCount++;
        }
    });
    
    // Update active month if active
    if (state.activeMonth === oldName) {
        state.activeMonth = trimmed;
    }
    
    saveState();
    renderApp();
    renderMonthsManagementList(); // Refresh inside modal
    alert(`Mes renombrado con éxito a "${trimmed}". Se actualizaron ${updatedCount} clientes.`);
}

// Delete a month and warn/cascade delete its registered leads
function confirmDeleteMonth(monthName) {
    const leadsCount = state.leads.filter(l => l.month === monthName).length;
    let confirmMsg = `¿Estás seguro de que deseas eliminar permanentemente el mes "${monthName}" del CRM?`;
    if (leadsCount > 0) {
        confirmMsg += `\n\n🚨 ATENCIÓN: Se eliminarán permanentemente los ${leadsCount} clientes registrados en este mes de forma IRREVERSIBLE.`;
    }
    
    if (confirm(confirmMsg)) {
        // Collect IDs of leads in this month to mark them as deleted
        const monthLeads = state.leads.filter(l => l.month === monthName);
        state.deletedLeads = state.deletedLeads || [];
        monthLeads.forEach(l => {
            if (!state.deletedLeads.includes(l.id)) {
                state.deletedLeads.push(l.id);
            }
        });

        // Add the month to deletedMonths list
        state.deletedMonths = state.deletedMonths || [];
        if (!state.deletedMonths.includes(monthName)) {
            state.deletedMonths.push(monthName);
        }

        state.months = state.months.filter(m => m !== monthName);
        state.leads = state.leads.filter(l => l.month !== monthName);
        
        // If the active month was deleted, switch to the first available month
        if (state.activeMonth === monthName) {
            state.activeMonth = state.months[0] || "";
        }
        
        saveState();
        renderApp();
        renderMonthsManagementList(); // Refresh inside modal
        alert(`El mes "${monthName}" y todos sus clientes asociados han sido eliminados del CRM.`);
    }
}

// --- IMPORTS & BACKUP LOGIC ---

// Export database as standard Excel CSV
// Copia el número de celular al portapapeles y ofrece feedback visual
window.copyToClipboard = function(text, element) {
    if (!text) return;
    const cleanNum = text.replace(/[^\d]/g, "");
    navigator.clipboard.writeText(cleanNum).then(() => {
        const originalHTML = element.innerHTML;
        element.innerHTML = `<span style="color:var(--success); font-weight:800;">¡Copiado!</span>`;
        element.style.pointerEvents = "none";
        setTimeout(() => {
            element.innerHTML = originalHTML;
            element.style.pointerEvents = "auto";
        }, 1200);
    }).catch(err => {
        console.error("Error al copiar al portapapeles:", err);
    });
};

// --- EXPORT TO EXCEL (.xlsx) LOGIC ---

function openExportExcelModal() {
    document.getElementById("modal-export-excel").classList.add("active");
}

function doExcelExport() {
    const lineVal = document.getElementById("export-line-select").value;
    
    // Filter total client base (state.leads) across all months!
    let exportLeads = state.leads || [];
    if (lineVal !== "all") {
        exportLeads = exportLeads.filter(l => l.line === lineVal);
    }
    
    if (exportLeads.length === 0) {
        alert("No hay datos de clientes para exportar con la rama seleccionada.");
        return;
    }
    
    // Sort leads chronologically
    exportLeads = [...exportLeads].sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));
    
    // Build JSON data for SheetJS
    const excelData = exportLeads.map((lead, index) => {
        // Build commercial history as a readable string
        const historyText = (lead.history || []).map(h => `[${h.date}] ${h.text}`).join("\r\n");
        
        return {
            "N°": index + 1,
            "Fecha Registro": lead.date || "",
            "Mes de Seguimiento": lead.month || "",
            "Cliente / Contacto": lead.name || "sin nombre",
            "Teléfono / Celular": lead.phone || "",
            "Línea de Negocio": lead.line === "contabilidad" ? "Contabilidad B2B" : "IT / Software ERP",
            "Etapa del Embudo": FUNNEL_STAGES.find(s => s.id === lead.stage)?.label || lead.stage,
            "Presupuesto ($)": lead.budget || "-",
            "Próxima Cita / Reunión": lead.meeting || "-",
            "Motivo de Pérdida": lead.stage === "perdido" ? LOST_REASONS[lead.lostReason] || lead.lostReason || "Otros" : "",
            "Último Comentario": lead.snippet || "",
            "Historial Comercial Completo": historyText
        };
    });
    
    // Generate SheetJS Workbook and Sheet
    try {
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        
        // Auto-fit column widths
        const maxLen = {};
        excelData.forEach(row => {
            Object.keys(row).forEach(key => {
                const val = String(row[key] || "");
                const len = val.includes("\n") ? 30 : Math.min(val.length, 50);
                maxLen[key] = Math.max(maxLen[key] || 10, len);
            });
        });
        worksheet["!cols"] = Object.keys(maxLen).map(key => ({ wch: maxLen[key] + 3 }));
        
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");
        
        // Generate filename
        const dateStr = new Date().toISOString().slice(0, 10);
        const lineSuffix = lineVal === "all" ? "Consolidado" : lineVal === "contabilidad" ? "Contabilidad" : "Sistemas";
        const filename = `CRM_Base_Clientes_${lineSuffix}_${dateStr}.xlsx`;
        
        XLSX.writeFile(workbook, filename);
        
        // Close modal
        document.getElementById("modal-export-excel").classList.remove("active");
    } catch (e) {
        console.error("Error al exportar a Excel:", e);
        alert("Ocurrió un error al generar el archivo Excel: " + e.message);
    }
}

// --- DUPLICATE DETECTOR LOGIC ---

function openDuplicatesModal() {
    detectAndShowDuplicates();
    document.getElementById("modal-duplicates").classList.add("active");
}

function detectAndShowDuplicates() {
    const container = document.getElementById("duplicates-list-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    // Group leads by normalized last 9 digits of phone
    const groups = {};
    const leads = state.leads || [];
    
    leads.forEach(l => {
        if (!l.phone) return;
        const digits = l.phone.replace(/[^\d]/g, "");
        const cleanPhone = digits.length >= 9 ? digits.slice(-9) : digits;
        if (!cleanPhone || cleanPhone.length < 8) return;
        
        if (!groups[cleanPhone]) {
            groups[cleanPhone] = [];
        }
        groups[cleanPhone].push(l);
    });
    
    // Filter groups with size > 1
    const duplicateGroups = Object.keys(groups)
        .filter(phone => groups[phone].length > 1)
        .map(phone => ({
            phone: phone,
            leads: groups[phone]
        }));
        
    if (duplicateGroups.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 0; color: var(--text-secondary);">
                <i data-lucide="check-circle" style="width: 48px; height: 48px; color: var(--success); margin-bottom: 12px;"></i>
                <p style="font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">¡Felicidades! No se detectaron contactos duplicados.</p>
                <p style="font-size: 0.85rem;">Todos los números en el CRM son únicos.</p>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
        return;
    }
    
    // Render duplicate groups
    duplicateGroups.forEach(group => {
        const groupCard = document.createElement("div");
        groupCard.className = "details-card";
        groupCard.style.border = "1px solid var(--border-color)";
        groupCard.style.borderRadius = "var(--radius-md)";
        groupCard.style.backgroundColor = "rgba(30, 41, 59, 0.3)";
        groupCard.style.marginBottom = "15px";
        
        // Card Header
        const header = document.createElement("div");
        header.className = "card-header";
        header.style.display = "flex";
        header.style.justify = "space-between";
        header.style.alignItems = "center";
        header.style.padding = "10px 16px";
        header.style.borderBottom = "1px solid var(--border-color)";
        header.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px;">
                <span style="display:inline-flex; width:8px; height:8px; border-radius:50%; background-color:var(--warning);"></span>
                <h4 style="margin:0; font-size:0.9rem; font-weight:700; color:var(--text-primary);">Teléfono: ${group.leads[0].phone}</h4>
            </div>
            <span class="status-tag perdido" style="font-size:0.7rem; font-weight:700; padding:2px 6px; background-color:rgba(239, 68, 68, 0.15); color:var(--danger); border-radius:4px;">${group.leads.length} registros</span>
        `;
        groupCard.appendChild(header);
        
        // Card Body with table
        const body = document.createElement("div");
        body.className = "card-body no-padding";
        
        const tableContainer = document.createElement("div");
        tableContainer.className = "table-responsive";
        tableContainer.style.overflowX = "auto";
        
        const table = document.createElement("table");
        table.className = "data-table";
        table.style.fontSize = "0.78rem";
        table.style.width = "100%";
        table.innerHTML = `
            <thead>
                <tr>
                    <th style="padding:6px 12px; font-size:0.7rem;">Mes / Fecha</th>
                    <th style="padding:6px 12px; font-size:0.7rem;">Cliente</th>
                    <th style="padding:6px 12px; font-size:0.7rem;">Línea</th>
                    <th style="padding:6px 12px; font-size:0.7rem;">Etapa</th>
                    <th style="padding:6px 12px; font-size:0.7rem;">Última Nota</th>
                    <th style="padding:6px 12px; font-size:0.7rem; text-align:center;">Acciones</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        const tbody = table.querySelector("tbody");
        
        group.leads.forEach(lead => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="padding:8px 12px;"><strong>${lead.month}</strong><br><small style="color:var(--text-secondary);">${lead.date}</small></td>
                <td style="padding:8px 12px; font-weight:600; color:var(--text-primary);">${lead.name}</td>
                <td style="padding:8px 12px;"><span class="card-line-tag ${lead.line}" style="font-size:0.65rem; padding:1px 4px;">${lead.line === 'contabilidad' ? 'Contabilidad' : 'Sistemas'}</span></td>
                <td style="padding:8px 12px;"><span class="status-tag ${lead.stage}" style="font-size:0.65rem; padding:1px 4px;">${FUNNEL_STAGES.find(s => s.id === lead.stage)?.label || lead.stage}</span></td>
                <td style="padding:8px 12px; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${lead.snippet || ''}">${lead.snippet || '-'}</td>
                <td style="padding:8px 12px; text-align:center;">
                    <div style="display:flex; justify-content:center; gap:6px;">
                        <button type="button" class="card-btn" onclick="editDuplicateLead('${lead.id}')" title="Editar lead" style="padding:4px;">
                            <i data-lucide="edit-2" style="width:13px; height:13px;"></i>
                        </button>
                        <button type="button" class="card-btn" onclick="deleteDuplicateLead('${lead.id}')" title="Eliminar lead" style="padding:4px; color:var(--danger);">
                            <i data-lucide="trash-2" style="width:13px; height:13px;"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        tableContainer.appendChild(table);
        body.appendChild(tableContainer);
        groupCard.appendChild(body);
        container.appendChild(groupCard);
    });
    
    if (window.lucide) {
        lucide.createIcons();
    }
}

// In-place edit of lead from duplicate modal
window.editDuplicateLead = function(id) {
    openEditLeadModal(id);
    
    // Intercept form submit to auto-refresh duplicate list
    const originalSubmit = document.getElementById("modal-client-submit").onclick;
    document.getElementById("modal-client-submit").onclick = () => {
        if (originalSubmit) originalSubmit();
        detectAndShowDuplicates();
        document.getElementById("modal-client-submit").onclick = originalSubmit;
    };
};

// In-place delete of lead from duplicate modal
window.deleteDuplicateLead = function(id) {
    const lead = state.leads.find(l => l.id === id);
    if (!lead) return;
    
    if (confirm(`¿Estás seguro de que deseas eliminar permanentemente el registro de "${lead.name}" (${lead.month})?\n\n🔄 Se moverá a la Papelera de Reciclaje.`)) {
        state.deletedLeads = state.deletedLeads || [];
        if (!state.deletedLeads.includes(id)) {
            state.deletedLeads.push(id);
        }
        
        state.trash = state.trash || [];
        const deletedLead = { ...lead, deletedAt: new Date().toISOString() };
        state.trash.push(deletedLead);

        state.leads = state.leads.filter(l => l.id !== id);
        saveState();
        detectAndShowDuplicates();
        renderApp(); // Refresh lists behind
    }
};

// Export full backup as JSON
function exportBackupJSON() {
    const backupObj = {
        leads: state.leads,
        months: state.months,
        activeMonth: state.activeMonth,
        templates: state.templates,
        deletedLeads: state.deletedLeads || [],
        trash: state.trash || [],
        version: "1.0",
        exportedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `MC_CRM_RESPALDO_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    state.lastBackupDate = new Date().toISOString();
    saveState();
    updateBackupIndicator();
}

// Import backup JSON schema validation
function handleJSONImport(file) {
    const reader = new FileReader();
    const errorDiv = document.getElementById("import-error");
    const successDiv = document.getElementById("import-success");

    errorDiv.style.display = "none";
    successDiv.style.display = "none";

    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            
            // Basic Schema validation
            if (!data.leads || !Array.isArray(data.leads) || !data.months || !Array.isArray(data.months)) {
                throw new Error("El archivo no tiene el formato de copia de seguridad válido de MC CRM.");
            }

            if (confirm(`Se han detectado ${data.leads.length} clientes y ${data.months.length} meses en el archivo. ¿Deseas sobreescribir la base de datos actual con este respaldo?`)) {
                state.leads = data.leads;
                state.months = data.months;
                state.activeMonth = data.activeMonth || data.months[data.months.length - 1];
                state.deletedLeads = data.deletedLeads || [];
                state.trash = data.trash || [];
                if (data.templates) {
                    state.templates = data.templates;
                }
                state.lastBackupDate = new Date().toISOString();
                
                saveState();
                successDiv.textContent = "¡Copia de seguridad restaurada correctamente con éxito!";
                successDiv.style.display = "block";
                
                setTimeout(() => {
                    renderApp();
                    successDiv.style.display = "none";
                }, 1500);
            }
        } catch (e) {
            errorDiv.textContent = "Error al procesar el archivo: " + e.message;
            errorDiv.style.display = "block";
        }
    };
    reader.readAsText(file);
}

// Clear local database factory reset
function resetDatabaseFactory() {
    if (confirm("🚨 ATENCIÓN: Estás a punto de borrar permanentemente todos los clientes y meses del CRM.\n¿Seguro que deseas continuar?")) {
        if (confirm("Esta acción no se puede deshacer. ¿Seguro de borrar de fábrica?")) {
            localStorage.clear();
            loadState();
            renderApp();
            alert("CRM restablecido de fábrica a su estado por defecto.");
        }
    }
}

// --- SETUP EVENT LISTENERS ---
function setupEventListeners() {
    // --- MOBILE RESPONSIVE DRAWER EVENTS ---
    const sidebar = document.getElementById("app-sidebar");
    const menuToggle = document.getElementById("menu-toggle-btn");
    const closeSidebar = document.getElementById("close-sidebar-btn");

    if (menuToggle && sidebar) {
        menuToggle.onclick = () => {
            sidebar.classList.add("active");
        };
    }

    if (closeSidebar && sidebar) {
        closeSidebar.onclick = () => {
            sidebar.classList.remove("active");
        };
    }

    // 1. Sidebar Nav click routing
    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".content-section");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
            
            // Section swap
            const targetId = item.id.replace("nav-", "sec-");
            sections.forEach(sec => sec.classList.remove("active"));
            
            const targetSec = document.getElementById(targetId);
            if (targetSec) {
                targetSec.classList.add("active");
            }

            // Close sidebar drawer on mobile after clicking
            if (sidebar && window.innerWidth <= 768) {
                sidebar.classList.remove("active");
            }

            // Sync top header title
            const pageTitle = document.getElementById("page-title");
            const pageSubtitle = document.getElementById("page-subtitle");
            
            if (item.id === "nav-dashboard") {
                pageTitle.textContent = "Panel de Control";
                pageSubtitle.textContent = "Estadísticas e información general del negocio";
                state.activeNav = "dashboard";
                renderApp(); // recalculate metrics
            } else if (item.id === "nav-metrics") {
                pageTitle.textContent = "Reportes y Métricas";
                pageSubtitle.textContent = "Gráficos de evolución y análisis de rendimiento de leads";
                state.activeNav = "metrics";
                renderApp();
            } else if (item.id === "nav-kanban") {
                pageTitle.textContent = "Embudo de Ventas (Tablero Kanban)";
                pageSubtitle.textContent = "Arrastra las tarjetas para cambiar su estado rápidamente";
                state.activeNav = "kanban";
                renderApp();
            } else if (item.id === "nav-clients") {
                pageTitle.textContent = "Lista Completa de Clientes";
                pageSubtitle.textContent = "Buscar, filtrar y gestionar todos los registros del mes";
                state.activeNav = "clients";
                renderApp();
            } else if (item.id === "nav-templates") {
                pageTitle.textContent = "Plantillas Oficiales de WhatsApp";
                pageSubtitle.textContent = "Copia respuestas dinámicas personalizando el nombre del cliente";
                state.activeNav = "templates";
                renderApp();
            } else if (item.id === "nav-backup") {
                pageTitle.textContent = "Mantenimiento, Respaldos y Datos";
                pageSubtitle.textContent = "Administra copias de seguridad de seguridad locales y exportaciones de Excel";
                state.activeNav = "backup";
                renderTrashList();
            }
        });
    });

    // 2. Active Month Selector Change
    const monthSelect = document.getElementById("month-select");
    if (monthSelect) {
        monthSelect.addEventListener("change", (e) => {
            state.activeMonth = e.target.value;
            state.dateFilterType = "month"; // Reset date range filter when manual month is changed
            state.presetName = "este_mes";
            saveState();
            if (state.activeNav === "calendar") {
                calendarCurrentDate = getActiveMonthDate();
            }
            renderApp();
        });
    }

    // 3. New Month Modal Trigger
    const addMonthBtn = document.getElementById("add-month-btn");
    const modalMonth = document.getElementById("modal-month");
    
    if (addMonthBtn && modalMonth) {
        addMonthBtn.onclick = () => {
            document.getElementById("month-form").reset();
            renderMonthsManagementList(); // Cargar y renderizar la lista de meses existentes
            modalMonth.classList.add("active");
            setTimeout(() => document.getElementById("new-month-name").focus(), 150);
        };
        
        document.getElementById("modal-month-close").onclick = () => modalMonth.classList.remove("active");
        document.getElementById("modal-month-cancel").onclick = () => modalMonth.classList.remove("active");
        
        document.getElementById("month-form").onsubmit = () => {
            handleMonthFormSubmit();
            return false;
        };
    }

    // 4. Line Toggle (All / Contabilidad / Sistemas)
    const lineBtns = document.querySelectorAll(".line-btn");
    lineBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            lineBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            state.activeLine = btn.getAttribute("data-line");
            
            // Sync with ROI monitor select value
            const roiSelect = document.getElementById("roi-line-select");
            if (roiSelect) {
                roiSelect.value = state.activeLine;
            }
            
            renderApp();
        });
    });

    // 5. Theme Toggle Button
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
        themeBtn.onclick = () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("mc_theme", newTheme);
            updateThemeToggleButton(newTheme);
        };
    }

    // 6. Client Modal Trigger Buttons
    const btnNewClient = document.getElementById("btn-new-client");
    const modalClient = document.getElementById("modal-client");
    
    if (btnNewClient && modalClient) {
        btnNewClient.onclick = openAddLeadModal;
        
        document.getElementById("modal-client-close").onclick = () => modalClient.classList.remove("active");
        document.getElementById("modal-client-cancel").onclick = () => modalClient.classList.remove("active");
        
        document.getElementById("client-form").onsubmit = () => {
            handleClientFormSubmit();
            return false;
        };

        // Form Stage Dropdown Change -> Toggle lost reason select
        const stageSelect = document.getElementById("client-stage");
        stageSelect.addEventListener("change", (e) => {
            const groupLost = document.getElementById("group-lost-reason");
            if (e.target.value === "perdido") {
                groupLost.style.display = "block";
                document.getElementById("client-lost-reason").required = true;
            } else {
                groupLost.style.display = "none";
                document.getElementById("client-lost-reason").required = false;
                document.getElementById("client-lost-reason").value = "";
            }
        });

        // Auto-update month select on date input change
        const clientDateInput = document.getElementById("client-date");
        clientDateInput.addEventListener("change", (e) => {
            const val = e.target.value;
            if (!val) return;
            const parts = val.split("-");
            if (parts.length !== 3) return;
            const year = parseInt(parts[0]);
            const monthIdx = parseInt(parts[1]) - 1;
            const MONTH_NAMES = [
              "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
              "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            const monthName = `${MONTH_NAMES[monthIdx]} ${year}`;
            
            const modalSelect = document.getElementById("client-month-select");
            if (modalSelect) {
                let found = false;
                for (let i = 0; i < modalSelect.options.length; i++) {
                    if (modalSelect.options[i].value === monthName) {
                        modalSelect.value = monthName;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    if (!state.months.includes(monthName)) {
                        state.months.push(monthName);
                        saveState();
                    }
                    renderMonthSelectors();
                    modalSelect.value = monthName;
                }
            }
        });

        // Attach Realtime WhatsApp Note Analyzer
        const noteArea = document.getElementById("client-whatsapp-note");
        noteArea.addEventListener("input", handleNotesAnalyzer);
    }

    // 7. Filters on clients list table
    const searchInput = document.getElementById("client-search-input");
    const filterStage = document.getElementById("filter-stage-select");
    const filterDate = document.getElementById("filter-date-input");
    const btnClearDate = document.getElementById("btn-clear-date-filter");
    
    if (searchInput && filterStage) {
        searchInput.addEventListener("input", () => renderClientList(getFilteredLeads()));
        filterStage.addEventListener("change", () => renderClientList(getFilteredLeads()));
    }
    if (filterDate) {
        filterDate.addEventListener("change", () => renderClientList(getFilteredLeads()));
    }
    if (btnClearDate && filterDate) {
        btnClearDate.onclick = () => {
            filterDate.value = "";
            renderClientList(getFilteredLeads());
        };
    }

    // 8. Template Simulator Dropdown and Button Copiers
    const selectSimClient = document.getElementById("template-client-select");
    if (selectSimClient) {
        selectSimClient.addEventListener("change", renderTemplateSection);
    }

    const btnSaveTemplateText = document.getElementById("btn-save-template-text");
    if (btnSaveTemplateText) {
        btnSaveTemplateText.onclick = () => {
            const activeKey = localStorage.getItem("mc_active_template_key") || "contacto_inicial";
            const editor = document.getElementById("template-text-editor");
            const selectClient = document.getElementById("template-client-select");
            const selLeadId = selectClient ? selectClient.value : "";

            // Determine active line for template saving
            let lineToUse = "contabilidad";
            if (selLeadId) {
                const leadObj = state.leads.find(l => l.id === selLeadId);
                if (leadObj && (leadObj.line === "contabilidad" || leadObj.line === "sistemas")) {
                    lineToUse = leadObj.line;
                }
            } else {
                if (state.activeLine === "sistemas") {
                    lineToUse = "sistemas";
                }
            }

            if (!editor || !state.templates[lineToUse] || !state.templates[lineToUse][activeKey]) return;

            let newText = editor.value;
            
            if (selLeadId) {
                const leadObj = state.leads.find(l => l.id === selLeadId);
                if (leadObj && leadObj.name) {
                    // Reemplazar de forma segura el nombre del cliente por el marcador [Nombre]
                    // Hacemos un reemplazo global e insensible a mayúsculas/minúsculas para evitar perder la plantilla base
                    const escapedName = leadObj.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    const regex = new RegExp(escapedName, 'gi');
                    newText = newText.replace(regex, '[Nombre]');
                }
            }

            state.templates[lineToUse][activeKey].text = newText;
            
            saveState(); // Saves locally & Syncs to Google Sheets!
            alert("¡Plantilla base guardada con éxito! Sincronizada en la nube.");
            renderTemplateSection();
        };
    }

    const btnCopyTemplate = document.getElementById("btn-copy-template");
    if (btnCopyTemplate) {
        btnCopyTemplate.onclick = () => {
            const editor = document.getElementById("template-text-editor");
            if (!editor) return;

            // Leer del valor del editor para capturar las personalizaciones en caliente del usuario
            const text = editor.value;
            navigator.clipboard.writeText(text).then(() => {
                alert("¡Mensaje copiado al portapapeles con éxito! Listo para pegar en WhatsApp.");
            }).catch(err => {
                console.error("Error copying template text:", err);
            });
        };
    }

    const btnSendWhatsApp = document.getElementById("btn-send-whatsapp-template");
    if (btnSendWhatsApp) {
        btnSendWhatsApp.onclick = () => {
            const editor = document.getElementById("template-text-editor");
            if (!editor) return;

            const phone = editor.getAttribute("data-phone");
            // Leer del valor del editor para capturar las personalizaciones en caliente del usuario
            const text = editor.value;
            
            const cleanPhone = phone.replace(/[^0-9]/g, '');
            const encodedText = encodeURIComponent(text);
            
            // Build wa.me url
            let url = `https://api.whatsapp.com/send?text=${encodedText}`;
            if (cleanPhone) {
                url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
            }

            window.open(url, "_blank");
        };
    }

    // 9. Backups Section Listeners
    const btnExportExcel = document.getElementById("btn-export-csv");
    if (btnExportExcel) btnExportExcel.onclick = openExportExcelModal;

    const btnExportJSON = document.getElementById("btn-export-json");
    if (btnExportJSON) btnExportJSON.onclick = exportBackupJSON;

    // Excel Export Modal Listeners
    const modalExportExcel = document.getElementById("modal-export-excel");
    const modalExportClose = document.getElementById("modal-export-close");
    const modalExportCancel = document.getElementById("modal-export-cancel");
    const btnDoExportExcel = document.getElementById("btn-do-export-excel");

    if (modalExportClose) modalExportClose.onclick = () => modalExportExcel.classList.remove("active");
    if (modalExportCancel) modalExportCancel.onclick = () => modalExportExcel.classList.remove("active");
    if (btnDoExportExcel) btnDoExportExcel.onclick = doExcelExport;

    // Duplicate Detector Modal & Button Listeners
    const btnDetectDuplicates = document.getElementById("btn-detect-duplicates");
    if (btnDetectDuplicates) btnDetectDuplicates.onclick = openDuplicatesModal;

    const modalDuplicates = document.getElementById("modal-duplicates");
    const modalDuplicatesClose = document.getElementById("modal-duplicates-close");
    const modalDuplicatesCancel = document.getElementById("modal-duplicates-cancel");

    if (modalDuplicatesClose) modalDuplicatesClose.onclick = () => modalDuplicates.classList.remove("active");
    if (modalDuplicatesCancel) modalDuplicatesCancel.onclick = () => modalDuplicates.classList.remove("active");

    const btnClearDB = document.getElementById("btn-clear-db");
    if (btnClearDB) btnClearDB.onclick = resetDatabaseFactory;

    // Drag over Zone for JSON Restore
    const dragZone = document.getElementById("import-drag-zone");
    const fileInput = document.getElementById("backup-file-input");
    
    if (dragZone && fileInput) {
        dragZone.onclick = () => fileInput.click();
        
        fileInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                handleJSONImport(e.target.files[0]);
            }
        });

        dragZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dragZone.classList.add("dragover");
        });

        dragZone.addEventListener("dragleave", () => {
            dragZone.classList.remove("dragover");
        });

        dragZone.addEventListener("drop", (e) => {
            e.preventDefault();
            dragZone.classList.remove("dragover");
            if (e.dataTransfer.files.length > 0) {
                handleJSONImport(e.dataTransfer.files[0]);
            }
        });
    }

    // --- GOOGLE SHEETS CLOUD SYNC LISTENERS ---
    const syncUrlInput = document.getElementById("sync-url-input");
    if (syncUrlInput) {
        syncUrlInput.value = state.syncUrl || "";
    }

    const btnSaveSync = document.getElementById("btn-save-sync");
    if (btnSaveSync) {
        btnSaveSync.onclick = () => {
            const urlVal = document.getElementById("sync-url-input").value.trim();
            if (!urlVal) {
                alert("Por favor ingresa una URL válida de Google Apps Script.");
                return;
            }
            state.syncUrl = urlVal;
            saveState(); // triggers auto triggerCloudSync()
            
            const successDiv = document.getElementById("sync-success");
            successDiv.textContent = "¡URL guardada y sincronización en la nube iniciada con éxito!";
            successDiv.style.display = "block";
            setTimeout(() => successDiv.style.display = "none", 3000);
        };
    }

    const btnPullSync = document.getElementById("btn-pull-sync");
    if (btnPullSync) {
        btnPullSync.onclick = () => {
            const urlVal = document.getElementById("sync-url-input").value.trim();
            if (!urlVal) {
                alert("Primero debes ingresar la URL de tu Google Apps Script.");
                return;
            }
            pullDataFromCloud(urlVal);
        };
    }

    const btnToggleInstructions = document.getElementById("btn-toggle-instructions");
    if (btnToggleInstructions) {
        btnToggleInstructions.onclick = () => {
            const box = document.getElementById("sync-instructions-box");
            if (box.style.display === "none") {
                box.style.display = "block";
                btnToggleInstructions.innerHTML = `<i data-lucide="help-circle"></i> Ocultar Instrucciones`;
            } else {
                box.style.display = "none";
                btnToggleInstructions.innerHTML = `<i data-lucide="help-circle"></i> ¿Cómo configurar? (Instrucciones)`;
            }
            lucide.createIcons();
        };
    }

    // --- CALENDAR NAV & MEETING INPUT LISTENERS ---
    const calendarNavItem = document.getElementById("nav-calendar");
    if (calendarNavItem) {
        calendarNavItem.onclick = (e) => {
            e.preventDefault();
            
            // Unselect all other nav items and active sections
            const navItems = document.querySelectorAll(".nav-item");
            const sections = document.querySelectorAll(".content-section");
            
            navItems.forEach(nav => nav.classList.remove("active"));
            calendarNavItem.classList.add("active");
            
            sections.forEach(sec => sec.classList.remove("active"));
            const targetSec = document.getElementById("sec-calendar");
            if (targetSec) targetSec.classList.add("active");
            
            // Sync top header title
            const pageTitle = document.getElementById("page-title");
            const pageSubtitle = document.getElementById("page-subtitle");
            if (pageTitle && pageSubtitle) {
                pageTitle.textContent = "Calendario de Reuniones y Actividades";
                pageSubtitle.textContent = "Visualiza tus próximas citas y sincronízalas con Google Calendar";
            }
            
            state.activeNav = "calendar";
            
            // Close mobile sidebar drawer
            const sidebar = document.getElementById("app-sidebar");
            if (sidebar && window.innerWidth <= 768) {
                sidebar.classList.remove("active");
            }
            
            // Sync calendar view to active month
            calendarCurrentDate = getActiveMonthDate();
            
            renderCalendar();
        };
    }

    // Meeting pickers listener to reactively update the Google Calendar link in Edit modal
    const meetingDateInput = document.getElementById("client-meeting-date");
    const meetingTimeInput = document.getElementById("client-meeting-time");
    if (meetingDateInput && meetingTimeInput) {
        meetingDateInput.addEventListener("input", updateMeetingFromInputs);
        meetingTimeInput.addEventListener("input", updateMeetingFromInputs);
    }

    // Month Navigation controls inside calendar
    const btnPrevMonth = document.getElementById("btn-prev-month");
    const btnNextMonth = document.getElementById("btn-next-month");
    if (btnPrevMonth && btnNextMonth) {
        btnPrevMonth.onclick = () => {
            calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() - 1);
            renderCalendar();
        };
        btnNextMonth.onclick = () => {
            calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() + 1);
            renderCalendar();
        };
    }

    // Campaign & ROI Selector listener
    const roiLineSelect = document.getElementById("roi-line-select");
    if (roiLineSelect) {
        roiLineSelect.addEventListener("change", () => {
            renderRoiMonitor();
        });
    }

    // Initialize custom date range picker
    initDateRangePicker();
}

// --- GOOGLE SHEETS CLOUD SYNC FUNCTIONS ---
function triggerCloudSync() {
    const url = state.syncUrl;
    if (!url) return;

    const badge = document.getElementById("sync-status-badge");
    const indicatorText = document.getElementById("backup-status-text");

    if (badge) {
        badge.textContent = "Sincronizando...";
        badge.style.backgroundColor = "var(--warning-light)";
        badge.style.color = "var(--warning)";
    }

    const localSaveTimeStr = localStorage.getItem("mc_crm_last_save_time");
    const saveTime = localSaveTimeStr || new Date().toISOString();

    const backupObj = {
        leads: state.leads,
        months: state.months,
        activeMonth: state.activeMonth,
        templates: state.templates,
        deletedLeads: state.deletedLeads || [],
        deletedMonths: state.deletedMonths || [],
        trash: state.trash || [],
        version: "1.0",
        exportedAt: saveTime
    };

    fetch(url, {
        method: "POST",
        mode: "no-cors", // Crucial to avoid CORS errors with Google Apps Script Web Apps when writing data
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(backupObj)
    })
    .then(() => {
        if (badge) {
            badge.textContent = "Sincronizado";
            badge.style.backgroundColor = "var(--success-light)";
            badge.style.color = "var(--success)";
        }
        state.lastBackupDate = new Date().toISOString();
        localStorage.setItem("mc_crm_last_backup", state.lastBackupDate);
        if (indicatorText) {
            indicatorText.textContent = "Sincronizado en la nube";
            document.getElementById("backup-indicator-dot").className = "status-indicator success";
        }
    })
    .catch(err => {
        console.error("Cloud Sync POST Error:", err);
        if (badge) {
            badge.textContent = "Error al sincronizar";
            badge.style.backgroundColor = "var(--danger-light)";
            badge.style.color = "var(--danger)";
        }
    });
}

function pullDataFromCloud(url) {
    const successDiv = document.getElementById("sync-success");
    const errorDiv = document.getElementById("sync-error");
    const badge = document.getElementById("sync-status-badge");

    successDiv.style.display = "none";
    errorDiv.style.display = "none";

    if (badge) {
        badge.textContent = "Cargando...";
        badge.style.backgroundColor = "var(--warning-light)";
        badge.style.color = "var(--warning)";
    }

    fetch(url)
    .then(response => {
        if (!response.ok) throw new Error("La respuesta del script de Google no fue satisfactoria.");
        return response.json();
    })
    .then(data => {
        if (!data.leads || !Array.isArray(data.leads) || !data.months || !Array.isArray(data.months)) {
            throw new Error("El archivo de Google Sheets no contiene una base de datos válida de MC CRM o está vacío.");
        }

        if (confirm(`Se han detectado ${data.leads.length} clientes en Google Sheets. ¿Deseas sobreescribir la base de datos de tu navegador con esta copia de la nube?`)) {
            state.leads = data.leads;
            state.months = data.months;
            state.activeMonth = data.activeMonth || data.months[data.months.length - 1];
            state.deletedLeads = data.deletedLeads || [];
            state.deletedMonths = data.deletedMonths || [];
            state.trash = data.trash || [];
            if (data.templates && Object.keys(data.templates).length > 0) {
                state.templates = data.templates;
            }
            state.syncUrl = url;
            state.lastBackupDate = new Date().toISOString();
            
            saveState();
            
            successDiv.textContent = "¡Base de datos cargada y sincronizada desde Google Sheets correctamente!";
            successDiv.style.display = "block";
            
            if (badge) {
                badge.textContent = "Sincronizado";
                badge.style.backgroundColor = "var(--success-light)";
                badge.style.color = "var(--success)";
            }

            setTimeout(() => {
                renderApp();
                successDiv.style.display = "none";
            }, 1500);
        } else {
            if (badge) {
                badge.textContent = "Listo para sincronizar";
                badge.style.backgroundColor = "var(--success-light)";
                badge.style.color = "var(--success)";
            }
        }
    })
    .catch(err => {
        console.error("Cloud Sync GET Error:", err);
        errorDiv.textContent = "Error al descargar datos: " + err.message;
        errorDiv.style.display = "block";
        if (badge) {
            badge.textContent = "Error al cargar";
            badge.style.backgroundColor = "var(--danger-light)";
            badge.style.color = "var(--danger)";
        }
    });
}

// Theme Label Sync
function updateThemeToggleButton(theme) {
    const textSpan = document.getElementById("theme-text");
    if (textSpan) {
        textSpan.textContent = theme === "dark" ? "Modo Claro" : "Modo Oscuro";
    }
}

// Helpers
function getFormattedNow() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

function getDaysSinceLastUpdate(lead) {
    let lastDateStr = lead.date;
    if (lead.history && lead.history.length > 0) {
        lastDateStr = lead.history[lead.history.length - 1].date.split(" ")[0];
    }
    const parts = lastDateStr.split('-');
    if (parts.length === 3) {
        const lastDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        const today = new Date();
        lastDate.setHours(0,0,0,0);
        today.setHours(0,0,0,0);
        const diffTime = today - lastDate;
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 ? diffDays : 0;
    }
    return 0;
}

// Parser inteligente y robusto de presupuestos/cotizaciones en formato de texto o número
function parseBudgetDetails(budgetVal) {
    if (budgetVal === undefined || budgetVal === null) {
        return { amount: 0, currency: "PEN", hasIgv: false };
    }
    
    // Cast a String de manera segura
    const budgetStr = String(budgetVal).trim();
    if (!budgetStr) {
        return { amount: 0, currency: "PEN", hasIgv: false };
    }
    
    const normalized = budgetStr.toLowerCase();
    
    // Determinar moneda: si contiene '$', 'usd', 'dolar', 'dólar' o 'us$'
    let currency = "PEN";
    if (normalized.includes("$") || normalized.includes("usd") || normalized.includes("dolar") || normalized.includes("dólar") || normalized.includes("us$")) {
        currency = "USD";
    }
    
    // Determinar si especifica '+ igv', '+igv', 'mas igv' o 'más igv'
    let hasIgv = false;
    if (normalized.includes("+ igv") || normalized.includes("+igv") || normalized.includes("mas igv") || normalized.includes("más igv")) {
        hasIgv = true;
    }
    
    // Remover prefijos/sufijos comunes de moneda para no dejar puntos/slashes al inicio o final
    let cleanStr = normalized
        .replace(/us\$/g, '')
        .replace(/s\/\./g, '')
        .replace(/s\//g, '')
        .replace(/\$/g, '')
        .replace(/usd/g, '')
        .replace(/pen/g, '')
        .trim();
        
    // Extraer únicamente dígitos, comas y puntos
    let cleaned = cleanStr.replace(/[^\d.,]/g, '').trim();
    
    if (!cleaned) {
        return { amount: 0, currency, hasIgv };
    }
    
    let amount = 0;
    if (cleaned.includes('.') && cleaned.includes(',')) {
        // e.g. "1.800,50" o "1,800.50"
        const firstDot = cleaned.indexOf('.');
        const firstComma = cleaned.indexOf(',');
        if (firstDot < firstComma) {
            // "1.800,50" -> punto es miles, coma es decimal
            cleaned = cleaned.replace(/\./g, '').replace(',', '.');
        } else {
            // "1,800.50" -> coma es miles, punto es decimal
            cleaned = cleaned.replace(/,/g, '');
        }
    } else if (cleaned.includes(',')) {
        // e.g. "4,800" o "1800,50"
        // Si la coma está seguida por exactamente 3 dígitos, es un separador de miles
        if (/,\d{3}$/.test(cleaned)) {
            cleaned = cleaned.replace(/,/g, '');
        } else {
            // De lo contrario es un separador decimal
            cleaned = cleaned.replace(',', '.');
        }
    } else if (cleaned.includes('.')) {
        // e.g. "1.800" o "1800.50"
        // En Perú y formatos contables locales, "1.800" suele ser mil ochocientos.
        // Si el punto está seguido por exactamente 3 dígitos, es un separador de miles
        if (/\.\d{3}$/.test(cleaned)) {
            cleaned = cleaned.replace(/\./g, '');
        }
    }
    
    amount = parseFloat(cleaned);
    return {
        amount: isNaN(amount) ? 0 : amount,
        currency,
        hasIgv
    };
}

// Mantiene compatibilidad con funciones existentes que requieran un número simple
function parseBudgetToNumber(budgetVal) {
    return parseBudgetDetails(budgetVal).amount;
}

// Formateador elegante de moneda para presupuestos/cotizaciones individuales en tablas
function formatCurrency(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return "-";
    const formatted = amount % 1 === 0 ? amount.toLocaleString('es-PE') : amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `S/. ${formatted}`;
}

// Formateador dinámico y elegante para tarjetas de métricas en dos monedas
function formatFinancialStats(penAmount, usdAmount) {
    let html = "";
    if (penAmount > 0 && usdAmount > 0) {
        // Ambas monedas
        html = `S/. ${Math.round(penAmount).toLocaleString('es-PE')} <span style="font-size: 0.85rem; font-weight: 500; opacity: 0.85; margin-left: 4px; display: inline-block;">+ $ ${Math.round(usdAmount).toLocaleString('en-US')}</span>`;
    } else if (usdAmount > 0) {
        // Solo dólares
        html = `$ ${Math.round(usdAmount).toLocaleString('en-US')}`;
    } else {
        // Soles o vacío
        html = `S/. ${Math.round(penAmount).toLocaleString('es-PE')}`;
    }
    return html;
}

// Formateador dinámico para el desglose del IGV como subtítulo de métricas
function formatFinancialSubtitle(penAmount, penTotalWithIgv, usdAmount, usdTotalWithIgv) {
    let subHtml = "";
    const penHasIgvDiff = penTotalWithIgv > penAmount;
    const usdHasIgvDiff = usdTotalWithIgv > usdAmount;
    
    if (penHasIgvDiff || usdHasIgvDiff) {
        let parts = [];
        if (penTotalWithIgv > 0) {
            parts.push(`S/. ${Math.round(penTotalWithIgv).toLocaleString('es-PE')} con IGV`);
        }
        if (usdTotalWithIgv > 0) {
            parts.push(`$ ${Math.round(usdTotalWithIgv).toLocaleString('en-US')} con IGV`);
        }
        subHtml = `Con IGV: ${parts.join(" | ")}`;
    } else {
        subHtml = penAmount > 0 || usdAmount > 0 ? "Valor neto base" : "Sin cotizaciones registradas";
    }
    return subHtml;
}

// Helper to get last update time of a lead based on history dates
function getLeadLastUpdateTime(lead) {
    if (!lead) return 0;
    if (lead.history && lead.history.length > 0) {
        let maxTime = 0;
        lead.history.forEach(h => {
            if (h.date) {
                // Parse "yyyy-mm-dd hh:mm" format safely by replacing '-' with '/'
                const t = new Date(h.date.replace(/-/g, '/')).getTime();
                if (!isNaN(t) && t > maxTime) {
                    maxTime = t;
                }
            }
        });
        if (maxTime > 0) return maxTime;
    }
    if (lead.date) {
        const t = new Date(lead.date.replace(/-/g, '/')).getTime();
        if (!isNaN(t)) return t;
    }
    return 0;
}

// Merge leads from two sources (local and cloud) based on their unique ID safely using deleted IDs
function mergeLeads(localLeads, cloudLeads, preferCloud, deletedIds = []) {
    const mergedMap = new Map();
    
    // Combine deleted lists
    const deletedSet = new Set(deletedIds);
    
    // 1. Add all cloud leads first if not deleted
    cloudLeads.forEach(lead => {
        if (!deletedSet.has(lead.id)) {
            mergedMap.set(lead.id, lead);
        }
    });
    
    // 2. Add local leads, merging overlaps safely using timestamps
    localLeads.forEach(localLead => {
        if (deletedSet.has(localLead.id)) {
            return;
        }
        if (mergedMap.has(localLead.id)) {
            const cloudLead = mergedMap.get(localLead.id);
            const localTime = getLeadLastUpdateTime(localLead);
            const cloudTime = getLeadLastUpdateTime(cloudLead);
            
            if (localTime > cloudTime) {
                mergedMap.set(localLead.id, localLead);
            } else if (cloudTime > localTime) {
                mergedMap.set(localLead.id, cloudLead);
            } else {
                if (preferCloud) {
                    mergedMap.set(localLead.id, cloudLead);
                } else {
                    mergedMap.set(localLead.id, localLead);
                }
            }
        } else {
            // New local lead: keep it!
            mergedMap.set(localLead.id, localLead);
        }
    });
    
    return Array.from(mergedMap.values());
}

function checkAndAutoSyncOnStartup() {
    const url = state.syncUrl;
    if (!url) return;

    const badge = document.getElementById("sync-status-badge");
    const indicatorText = document.getElementById("backup-status-text");

    if (badge) {
        badge.textContent = "Verificando nube...";
        badge.style.backgroundColor = "var(--warning-light)";
        badge.style.color = "var(--warning)";
    }

    fetch(url)
    .then(response => {
        if (!response.ok) throw new Error();
        return response.json();
    })
    .then(data => {
        if (!data.leads || !data.exportedAt) return;

        const cloudExportedTime = new Date(data.exportedAt);
        const localSaveTimeStr = localStorage.getItem("mc_crm_last_save_time");
        const localSaveTime = localSaveTimeStr ? new Date(localSaveTimeStr) : new Date(0);

        const timeDiff = cloudExportedTime.getTime() - localSaveTime.getTime();

        // Check if there are new leads in the cloud that are not in local storage
        const localIds = new Set(state.leads.map(l => l.id));
        const hasNewCloudLeads = data.leads.some(l => !localIds.has(l.id));

        // 5-second buffer (5000ms) to ignore minor time shifts / timing skews
        if (Math.abs(timeDiff) <= 5000 && !hasNewCloudLeads) {
            // Both are identical / already synchronized
            if (badge) {
                badge.textContent = "Sincronizado";
                badge.style.backgroundColor = "var(--success-light)";
                badge.style.color = "var(--success)";
            }
            if (indicatorText) {
                indicatorText.textContent = "Sincronizado en la nube";
                document.getElementById("backup-indicator-dot").className = "status-indicator success";
            }
        } else if (timeDiff > 5000 || hasNewCloudLeads) {
            // Cloud has newer changes, update local state silently!
            const mergedDeleted = Array.from(new Set([...(state.deletedLeads || []), ...(data.deletedLeads || [])]));
            state.deletedLeads = mergedDeleted;

            const mergedDeletedMonths = Array.from(new Set([...(state.deletedMonths || []), ...(data.deletedMonths || [])]));
            state.deletedMonths = mergedDeletedMonths;

            state.trash = data.trash || [];
            
            // BUT merge first to never lose a newly registered local lead!
            const mergedLeads = mergeLeads(state.leads, data.leads, true, mergedDeleted);
            
            // Check if we have local updates (new leads or newer edits) that are not in the cloud
            const cloudMap = new Map(data.leads.map(l => [l.id, l]));
            let hasLocalUpdates = false;
            for (let l of mergedLeads) {
                if (!cloudMap.has(l.id)) {
                    hasLocalUpdates = true;
                    break;
                }
                const cloudL = cloudMap.get(l.id);
                if (getLeadLastUpdateTime(l) > getLeadLastUpdateTime(cloudL)) {
                    hasLocalUpdates = true;
                    break;
                }
            }
            
            state.leads = mergedLeads;

            // Filter out deleted months from cloud months list
            state.months = (data.months || state.months).filter(m => !mergedDeletedMonths.includes(m));
            state.activeMonth = data.activeMonth || state.activeMonth;
            if (state.activeMonth && !state.months.includes(state.activeMonth)) {
                state.activeMonth = state.months[0] || "";
            }

            if (data.templates && Object.keys(data.templates).length > 0) {
                state.templates = data.templates;
            }
            
            // Save locally
            localStorage.setItem("mc_crm_leads", JSON.stringify(state.leads));
            localStorage.setItem("mc_crm_months", JSON.stringify(state.months));
            localStorage.setItem("mc_crm_active_month", state.activeMonth);
            localStorage.setItem("mc_crm_templates", JSON.stringify(state.templates));
            localStorage.setItem("mc_crm_deleted_leads", JSON.stringify(state.deletedLeads));
            localStorage.setItem("mc_crm_deleted_months", JSON.stringify(state.deletedMonths));
            localStorage.setItem("mc_crm_trash", JSON.stringify(state.trash));
            
            if (hasLocalUpdates) {
                // We merged local-only or modified leads that aren't in the cloud. PUSH them!
                const newSaveTime = new Date().toISOString();
                localStorage.setItem("mc_crm_last_save_time", newSaveTime);
                renderApp();
                triggerCloudSync();
            } else {
                localStorage.setItem("mc_crm_last_save_time", data.exportedAt);
                renderApp();
            }
            
            if (badge) {
                badge.textContent = hasLocalUpdates ? "Sincronizando..." : "Nube sincronizada";
                badge.style.backgroundColor = hasLocalUpdates ? "var(--warning-light)" : "var(--success-light)";
                badge.style.color = hasLocalUpdates ? "var(--warning)" : "var(--success)";
            }
            if (indicatorText) {
                indicatorText.textContent = hasLocalUpdates ? "Sincronizando..." : "Auto-sincronizado";
                document.getElementById("backup-indicator-dot").className = hasLocalUpdates ? "status-indicator warning" : "status-indicator success";
            }
        } else {
            // Local is newer, push to cloud!
            const mergedDeleted = Array.from(new Set([...(state.deletedLeads || []), ...(data.deletedLeads || [])]));
            state.deletedLeads = mergedDeleted;

            const mergedDeletedMonths = Array.from(new Set([...(state.deletedMonths || []), ...(data.deletedMonths || [])]));
            state.deletedMonths = mergedDeletedMonths;
            
            // Merge trash from cloud safely
            const localTrashIds = new Set((state.trash || []).map(l => l.id));
            const cloudTrash = data.trash || [];
            cloudTrash.forEach(l => {
                if (!localTrashIds.has(l.id)) {
                    state.trash.push(l);
                }
            });
            
            // BUT merge first to avoid overwriting cloud leads with demo leads on a new browser!
            const mergedLeads = mergeLeads(state.leads, data.leads, false, mergedDeleted);
            state.leads = mergedLeads;

            // Filter local months based on merged deleted months list
            state.months = state.months.filter(m => !mergedDeletedMonths.includes(m));
            if (state.activeMonth && !state.months.includes(state.activeMonth)) {
                state.activeMonth = state.months[0] || "";
            }
            
            // Save locally and trigger sync to push the merged database
            localStorage.setItem("mc_crm_leads", JSON.stringify(state.leads));
            localStorage.setItem("mc_crm_months", JSON.stringify(state.months));
            localStorage.setItem("mc_crm_active_month", state.activeMonth);
            localStorage.setItem("mc_crm_deleted_leads", JSON.stringify(state.deletedLeads));
            localStorage.setItem("mc_crm_deleted_months", JSON.stringify(state.deletedMonths));
            localStorage.setItem("mc_crm_trash", JSON.stringify(state.trash));
            const newSaveTime = new Date().toISOString();
            localStorage.setItem("mc_crm_last_save_time", newSaveTime);
            
            triggerCloudSync();
        }
    })
    .catch(err => {
        console.error("Auto Sync Startup Error:", err);
        if (badge) {
            badge.textContent = "Modo Offline";
            badge.style.backgroundColor = "var(--border-color)";
            badge.style.color = "var(--text-secondary)";
        }
    });
}

// ==========================================================================
// CALENDAR FEATURE LOGIC & GOOGLE CALENDAR QUICK SYNC
// ==========================================================================

let calendarCurrentDate = new Date(); // Guarda el mes/año actualmente visualizado en el calendario

// Parsea el mes activo del CRM ("Mayo 2026", etc.) para sincronizar el calendario
function getActiveMonthDate() {
    if (!state.activeMonth) return new Date();
    const parts = state.activeMonth.split(" ");
    if (parts.length === 2) {
        const monthNames = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
        const monthIdx = monthNames.indexOf(parts[0].toLowerCase());
        const year = parseInt(parts[1]);
        if (monthIdx !== -1 && !isNaN(year)) {
            return new Date(year, monthIdx, 1);
        }
    }
    return new Date();
}

// Analizador de texto inteligente para extraer fechas de las anotaciones de reuniones programadas
function extractDateFromMeetingText(meetingText, fallbackDateStr) {
    if (!meetingText) return null;
    
    // 1. Buscar patrón ISO YYYY-MM-DD
    const isoMatch = meetingText.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (isoMatch) {
        return new Date(parseInt(isoMatch[1]), parseInt(isoMatch[2]) - 1, parseInt(isoMatch[3]));
    }
    
    // 2. Buscar patrón DD/MM/YYYY o DD-MM-YYYY
    const slashMatch = meetingText.match(/(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
    if (slashMatch) {
        return new Date(parseInt(slashMatch[3]), parseInt(slashMatch[2]) - 1, parseInt(slashMatch[1]));
    }
    
    // 3. Buscar patrón corto DD/MM (ej: 02/06 o 2/6)
    const shortSlashMatch = meetingText.match(/(\d{1,2})[-/](\d{1,2})/);
    if (shortSlashMatch) {
        const currentYear = new Date().getFullYear();
        return new Date(currentYear, parseInt(shortSlashMatch[2]) - 1, parseInt(shortSlashMatch[1]));
    }
    
    // 4. Si no hay fecha en el texto, usar la fecha de registro como fallback
    if (fallbackDateStr) {
        const parts = fallbackDateStr.split('-');
        if (parts.length === 3) {
            return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        }
    }
    
    return null;
}

// Genera un enlace dinámico de Google Calendar pre-rellenado para sincronizarlo sin API keys
function getGoogleCalendarUrl(lead) {
    const parsedDate = extractDateFromMeetingText(lead.meeting, lead.date);
    if (!parsedDate) return null;
    
    const title = encodeURIComponent(`Reunión MC: ${lead.name}`);
    const details = encodeURIComponent(
        `Cliente: ${lead.name}\n` +
        `Celular: ${lead.phone}\n` +
        `Línea de Negocio: ${lead.line === 'contabilidad' ? 'Contabilidad' : 'Sistemas'}\n` +
        `Próxima Acción / Reunión: ${lead.meeting || 'Sin detalles'}\n` +
        `Comentario / Servicio: ${lead.snippet || 'Sin comentarios'}`
    );
    
    // Formatear fechas
    const yyyy = parsedDate.getFullYear();
    const mm = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(parsedDate.getDate()).padStart(2, '0');
    
    let timeStr = "";
    // Buscar hora en el texto (ej: 11am, 11:30am, 15:00, 10:00)
    const hourMatch = (lead.meeting || "").match(/(\d{1,2})[.:](\d{2})\s*(am|pm)?/i) || (lead.meeting || "").match(/(\d{1,2})\s*(am|pm)/i);
    
    if (hourMatch) {
        let hours = parseInt(hourMatch[1]);
        const minutes = hourMatch[2] && !isNaN(parseInt(hourMatch[2])) ? String(parseInt(hourMatch[2])).padStart(2, '0') : "00";
        const ampm = hourMatch[3] ? hourMatch[3].toLowerCase() : "";
        
        if (ampm === "pm" && hours < 12) hours += 12;
        if (ampm === "am" && hours === 12) hours = 0;
        
        const startHours = String(hours).padStart(2, '0');
        const endHours = String((hours + 1) % 24).padStart(2, '0');
        
        // Formato para Google Calendar (tiempo local sin Z)
        timeStr = `${yyyy}${mm}${dd}T${startHours}${minutes}00/${yyyy}${mm}${dd}T${endHours}${minutes}00`;
    } else {
        // Evento de todo el día (formato YYYYMMDD/YYYYMMDD)
        const nextDay = new Date(parsedDate);
        nextDay.setDate(parsedDate.getDate() + 1);
        const nextYyyy = nextDay.getFullYear();
        const nextMm = String(nextDay.getMonth() + 1).padStart(2, '0');
        const nextDd = String(nextDay.getDate()).padStart(2, '0');
        timeStr = `${yyyy}${mm}${dd}/${nextYyyy}${nextMm}${nextDd}`;
    }
    
    return `https://calendar.google.com/render?action=TEMPLATE&text=${title}&dates=${timeStr}&details=${details}`;
}

// Muestra u oculta el botón de sincronización de Google Calendar en el modal de edición
function updateGoogleCalendarButton(lead) {
    const container = document.getElementById("google-calendar-sync-container");
    const link = document.getElementById("btn-add-to-google-calendar");
    if (!container || !link) return;
    
    if (lead && lead.meeting) {
        const url = getGoogleCalendarUrl(lead);
        if (url) {
            link.href = url;
            container.style.display = "block";
            return;
        }
    }
    container.style.display = "none";
}

// Reactively updates the Google Calendar sync button from picker inputs
function updateMeetingFromInputs() {
    const activeId = document.getElementById("client-id").value;
    const meetingDateInput = document.getElementById("client-meeting-date");
    const meetingTimeInput = document.getElementById("client-meeting-time");
    
    const dVal = meetingDateInput ? meetingDateInput.value : "";
    const tVal = meetingTimeInput ? meetingTimeInput.value : "";
    
    let meetingStr = "";
    if (dVal) {
        meetingStr = dVal + (tVal ? " " + tVal : " 00:00");
    }
    
    const tempLead = {
        id: activeId || "temp",
        name: document.getElementById("client-name").value.trim() || "Cliente",
        phone: document.getElementById("client-phone").value.trim() || "",
        line: document.getElementById("client-line").value,
        meeting: meetingStr,
        date: document.getElementById("client-date").value || (() => {
            const d = new Date();
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        })(),
        snippet: document.getElementById("client-whatsapp-note").value.trim() || ""
    };
    
    updateGoogleCalendarButton(tempLead);
}

// Renderizar la cuadrícula del calendario mensual e integrar los eventos
function renderCalendar() {
    const daysGrid = document.getElementById("calendar-days-grid");
    const currentMonthYearHeader = document.getElementById("calendar-current-month-year");
    const upcomingEventsList = document.getElementById("upcoming-events-list");
    
    if (!daysGrid || !currentMonthYearHeader || !upcomingEventsList) return;
    
    // Validate calendarCurrentDate defensively
    if (!calendarCurrentDate || isNaN(calendarCurrentDate.getTime())) {
        calendarCurrentDate = new Date();
    }
    
    const year = calendarCurrentDate.getFullYear();
    const month = calendarCurrentDate.getMonth(); // 0-11
    
    // Nombres de meses en español
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    currentMonthYearHeader.textContent = `${monthNames[month]} ${year}`;
    daysGrid.innerHTML = "";
    
    // Obtener primer día de la semana del mes (0 = Domingo, 1 = Lunes...)
    const firstDayIndex = new Date(year, month, 1).getDay();
    
    // Obtener último día del mes actual
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // Obtener último día del mes anterior
    const prevLastDay = new Date(year, month, 0).getDate();
    
    // Rellenar cuadrícula fija de 42 celdas (6 semanas)
    const totalDaysCount = 42;
    // IMPORTANTE: Filtrar leads solo por la línea de negocio (Contabilidad/Sistemas) para que el calendario pueda navegar libremente por meses sin restringirse al mes activo del Kanban
    const filteredLeads = state.leads.filter(lead => state.activeLine === "all" || lead.line === state.activeLine);
    
    for (let i = 1; i <= totalDaysCount; i++) {
        const cell = document.createElement("div");
        cell.className = "calendar-day-cell";
        
        let dayNumber;
        let cellDate;
        
        if (i <= firstDayIndex) {
            // Días del mes anterior
            dayNumber = prevLastDay - firstDayIndex + i;
            cell.classList.add("other-month");
            cellDate = new Date(year, month - 1, dayNumber);
        } else if (i > firstDayIndex + lastDay) {
            // Días del mes siguiente
            dayNumber = i - firstDayIndex - lastDay;
            cell.classList.add("other-month");
            cellDate = new Date(year, month + 1, dayNumber);
        } else {
            // Días del mes actual
            dayNumber = i - firstDayIndex;
            cellDate = new Date(year, month, dayNumber);
            
            // Comprobar si es hoy
            const today = new Date();
            if (dayNumber === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                cell.classList.add("today");
            }
        }
        
        cell.innerHTML = `
            <span class="calendar-day-number">${dayNumber}</span>
            <div class="calendar-day-events" id="cell-events-${i}"></div>
        `;
        daysGrid.appendChild(cell);
        
        const cellEventsContainer = cell.querySelector(".calendar-day-events");
        
        // Filtrar y renderizar eventos para este día específico
        filteredLeads.forEach(lead => {
            if (lead.meeting) {
                const eventDate = extractDateFromMeetingText(lead.meeting, lead.date);
                if (eventDate && 
                    eventDate.getDate() === cellDate.getDate() && 
                    eventDate.getMonth() === cellDate.getMonth() && 
                    eventDate.getFullYear() === cellDate.getFullYear()) {
                    
                    const pill = document.createElement("div");
                    pill.className = `calendar-event-pill ${lead.line}`;
                    const nameStr = String(lead.name || "").trim();
                    const lineTag = lead.line === 'contabilidad' ? '[CONT]' : '[SIST]';
                    const displayTitle = (nameStr && nameStr.toLowerCase() !== "sin nombre") 
                        ? `${lineTag} ${lead.phone} (${nameStr})` 
                        : `${lineTag} ${lead.phone}`;
                    pill.textContent = displayTitle;
                    pill.title = `${lead.name}: ${lead.meeting}`;
                    pill.onclick = (e) => {
                        e.stopPropagation();
                        openEditLeadModal(lead.id);
                    };
                    cellEventsContainer.appendChild(pill);
                }
            }
        });
    }
    
    // Renderizar panel lateral de próximas reuniones
    renderUpcomingMeetingsList(filteredLeads);
    
    // Actualizar estado del botón de notificaciones
    if (typeof updateNotificationButtonState === "function") {
        updateNotificationButtonState();
    }
    
    // Re-crear iconos de lucide
    lucide.createIcons();
}

// Renderiza la lista lateral de las próximas reuniones agendadas cronológicamente
function renderUpcomingMeetingsList(leads) {
    const upcomingEventsList = document.getElementById("upcoming-events-list");
    if (!upcomingEventsList) return;
    
    upcomingEventsList.innerHTML = "";
    
    // Filtrar leads que tengan reuniones programadas
    const meetingsLeads = leads.filter(l => l.meeting);
    
    // Mapear con su fecha parseada para poder ordenarlos
    const sortedMeetings = meetingsLeads.map(lead => {
        let d = extractDateFromMeetingText(lead.meeting, lead.date);
        if (!d || isNaN(d.getTime())) {
            d = new Date(9999, 11, 31);
        }
        return { lead, date: d };
    }).sort((a, b) => a.date - b.date);
    
    // Filtrar solo reuniones futuras o de hoy en adelante
    const todayStart = new Date().setHours(0,0,0,0);
    const upcomingMeetings = sortedMeetings.filter(m => m.date >= todayStart).slice(0, 10);
    
    if (upcomingMeetings.length === 0) {
        upcomingEventsList.innerHTML = `
            <div style="text-align:center; color:var(--text-secondary); font-size:0.8rem; padding: 30px 0; border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
                No hay reuniones programadas para los próximos días.
            </div>
        `;
        return;
    }
    
    upcomingMeetings.forEach(item => {
        const lead = item.lead;
        const div = document.createElement("div");
        div.className = "upcoming-item";
        div.style.cursor = "pointer";
        div.onclick = () => openEditLeadModal(lead.id);
        
        const calUrl = getGoogleCalendarUrl(lead);
        let syncButtonHTML = "";
        if (calUrl) {
            syncButtonHTML = `
                <a href="${calUrl}" target="_blank" onclick="event.stopPropagation();" style="display:inline-flex; align-items:center; gap:2px; font-size:0.7rem; color:var(--warning); font-weight:700; text-transform:uppercase; text-decoration:underline;" title="Sincronizar con Google Calendar">
                    <i data-lucide="calendar" style="width:10px; height:10px;"></i> Google Calendar
                </a>
            `;
        }
        
        const nameStr = String(lead.name || "").trim();
        const displayTitle = (nameStr && nameStr.toLowerCase() !== "sin nombre") 
            ? `${lead.phone} (${nameStr})` 
            : lead.phone;

        div.innerHTML = `
            <span class="upcoming-item-title">${displayTitle}</span>
            <span class="upcoming-item-time"><i data-lucide="clock" style="width:12px; height:12px;"></i> ${lead.meeting}</span>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px; flex-wrap:wrap; gap:4px;">
                <span class="upcoming-item-line card-line-tag ${lead.line}">${lead.line === 'contabilidad' ? 'Contabilidad' : 'Sistemas'}</span>
                ${syncButtonHTML}
            </div>
        `;
        upcomingEventsList.appendChild(div);
    });
}

// Solicitar permisos de notificación nativa del navegador
function requestNotificationPermission() {
    if ("Notification" in window) {
        if (Notification.permission === "default") {
            Notification.requestPermission().then(permission => {
                console.log("Browser notification permission status:", permission);
                updateNotificationButtonState();
            });
        } else {
            updateNotificationButtonState();
        }
    }
}

// Actualizar el estado visual e interactivo del botón de notificaciones en el Calendario
function updateNotificationButtonState() {
    const btn = document.getElementById("btn-request-notifications");
    if (!btn) return;
    
    if (!("Notification" in window)) {
        btn.style.display = "none";
        return;
    }
    
    btn.style.display = "inline-flex";
    
    if (Notification.permission === "granted") {
        btn.innerHTML = `<i data-lucide="bell-ring"></i> Alertas Web Activas`;
        btn.style.color = "var(--success)";
        btn.style.backgroundColor = "var(--success-light)";
        btn.style.border = "1px solid var(--success)";
        btn.style.cursor = "default";
        btn.onclick = null; // Quitar evento click ya que está activo
    } else if (Notification.permission === "denied") {
        btn.innerHTML = `<i data-lucide="bell-off"></i> Alertas Bloqueadas`;
        btn.style.color = "var(--danger)";
        btn.style.backgroundColor = "var(--danger-light)";
        btn.style.border = "1px solid var(--danger)";
        btn.style.cursor = "pointer";
        btn.onclick = () => {
            alert("Las alertas están bloqueadas en tu navegador.\n\nPara desbloquearlas:\n1. Haz clic en el icono del candado o controles del sitio al lado del enlace en tu navegador (barra de direcciones).\n2. Cambia el permiso de 'Notificaciones' a 'Permitir'.\n3. Recarga la página.");
        };
    } else {
        // Estado por defecto (Default)
        btn.innerHTML = `<i data-lucide="bell"></i> Activar Alertas Web`;
        btn.style.color = "var(--warning)";
        btn.style.backgroundColor = "var(--warning-light)";
        btn.style.border = "1px dashed var(--warning)";
        btn.style.cursor = "pointer";
        btn.onclick = () => {
            Notification.requestPermission().then(permission => {
                updateNotificationButtonState();
                if (permission === "granted") {
                    alert("¡Excelente! Las notificaciones web han sido activadas con éxito. Recibirás un aviso 15 minutos antes de cada reunión.");
                }
            });
        };
    }
    
    // Volver a renderizar los iconos del botón
    lucide.createIcons();
}

const notifiedMeetings = new Set();

// Comprobar citas próximas en segundo plano y avisar a la clienta
function checkUpcomingMeetingsNotifications() {
    if (!("Notification" in window) || Notification.permission !== "granted") {
        return;
    }
    
    const now = new Date();
    
    state.leads.forEach(lead => {
        if (!lead.meeting) return;
        
        const meetingDate = extractDateFromMeetingText(lead.meeting, lead.date);
        if (!meetingDate) return;
        
        // Buscar patrón H:MM o HH:MM en lead.meeting
        const timeMatch = lead.meeting.match(/(\d{1,2}):(\d{2})/);
        if (!timeMatch) return;
        
        const hours = parseInt(timeMatch[1]);
        const minutes = parseInt(timeMatch[2]);
        
        meetingDate.setHours(hours, minutes, 0, 0);
        
        // Calcular diferencia en minutos
        const diffMs = meetingDate - now;
        const diffMins = diffMs / (60 * 1000);
        
        // Alerta si la reunión es hoy y en los próximos 15 minutos
        if (diffMins > 0 && diffMins <= 15) {
            const notificationKey = `${lead.id}_${meetingDate.getTime()}`;
            if (!notifiedMeetings.has(notificationKey)) {
                notifiedMeetings.add(notificationKey);
                
                const nameStr = String(lead.name || "").trim();
                const displayTitle = (nameStr && nameStr.toLowerCase() !== "sin nombre") ? nameStr : lead.phone;
                const bodyText = `Reunión agendada para las ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}. Celular: ${lead.phone}`;
                
                try {
                    const notification = new Notification(`Próxima Cita: ${displayTitle}`, {
                        body: bodyText,
                        icon: "LogoMCweb (4).png"
                    });
                    
                    notification.onclick = () => {
                        window.focus();
                        openEditLeadModal(lead.id);
                    };
                } catch (e) {
                    console.error("Failed to trigger browser notification:", e);
                }
            }
        }
    });
}

// --- PREMIUM RECYCLE BIN (PAPELERA DE RECICLAJE) FUNCTIONS ---

// Renderizar la lista de clientes en la papelera de reciclaje
function renderTrashList() {
    const listBody = document.getElementById("trash-list-tbody");
    const container = document.getElementById("trash-table-container");
    const emptyText = document.getElementById("trash-list-empty");
    const badge = document.getElementById("trash-count-badge");
    
    if (!listBody || !container || !emptyText || !badge) return;
    
    state.trash = state.trash || [];
    badge.textContent = `${state.trash.length} Clientes`;
    
    if (state.trash.length === 0) {
        container.style.display = "none";
        emptyText.style.display = "block";
        return;
    }
    
    container.style.display = "block";
    emptyText.style.display = "none";
    listBody.innerHTML = "";
    
    // Ordenar papelera por fecha de eliminación más reciente
    const sortedTrash = [...state.trash].sort((a, b) => String(b.deletedAt || "").localeCompare(String(a.deletedAt || "")));
    
    sortedTrash.forEach(lead => {
        const tr = document.createElement("tr");
        const nameStr = String(lead.name || "").trim();
        const displayTitle = (nameStr && nameStr.toLowerCase() !== "sin nombre") ? nameStr : lead.phone;
        
        let deletedDateDisplay = "-";
        if (lead.deletedAt) {
            deletedDateDisplay = lead.deletedAt.split("T")[0];
        }
        
        tr.innerHTML = `
            <td><code style="font-size:0.75rem; font-weight:bold;">${deletedDateDisplay}</code></td>
            <td><strong style="color:var(--text-primary);">${displayTitle}</strong></td>
            <td><span style="color:var(--text-secondary); font-size:0.8rem;">${lead.phone}</span></td>
            <td><span class="card-line-tag ${lead.line}">${lead.line === 'contabilidad' ? 'Contabilidad' : 'Sistemas'}</span></td>
            <td><span style="color:var(--success); font-weight:700; font-size:0.8rem;">${lead.budget ? lead.budget : '-'}</span></td>
            <td>
                <div style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 0.8rem; color: var(--text-secondary);" title="${lead.snippet || ''}">
                    ${lead.snippet || 'Sin comentarios'}
                </div>
            </td>
            <td>
                <div class="card-actions" style="border:none; padding:0; justify-content: flex-start; gap:10px;">
                    <button class="btn-success" onclick="restoreLeadFromTrash('${lead.id}')" title="Restaurar al CRM" style="padding: 4px 8px; font-size: 0.75rem; font-weight:700; display:inline-flex; align-items:center; gap:4px; height:auto; width:auto; border-radius:4px;">
                        <i data-lucide="rotate-ccw" style="width: 12px; height: 12px;"></i> Restaurar
                    </button>
                    <button class="btn-danger" onclick="permanentlyDeleteLead('${lead.id}')" title="Eliminar definitivamente" style="padding: 4px 8px; font-size: 0.75rem; font-weight:700; display:inline-flex; align-items:center; gap:4px; height:auto; width:auto; border-radius:4px; background-color:var(--danger); border-color:var(--danger);">
                        <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i> Borrar
                    </button>
                </div>
            </td>
        `;
        listBody.appendChild(tr);
    });
    
    lucide.createIcons();
}

// Restaurar cliente desde la papelera al embudo activo
function restoreLeadFromTrash(id) {
    state.trash = state.trash || [];
    const lead = state.trash.find(l => l.id === id);
    if (!lead) return;

    // Remover de papelera
    state.trash = state.trash.filter(l => l.id !== id);

    // Remover de tombstones (para que vuelva a sincronizar en todos los PCs)
    state.deletedLeads = (state.deletedLeads || []).filter(deletedId => deletedId !== id);

    // Restaurar al listado activo
    const restoredLead = { ...lead };
    delete restoredLead.deletedAt;
    
    if (!state.leads.some(l => l.id === id)) {
        state.leads.push(restoredLead);
    }

    saveState();
    renderApp();
    renderTrashList();
    alert(`¡Cliente "${lead.name}" restaurado con éxito al CRM!`);
}

// Eliminar definitivamente un cliente de la papelera
function permanentlyDeleteLead(id) {
    state.trash = state.trash || [];
    const lead = state.trash.find(l => l.id === id);
    if (!lead) return;

    if (confirm(`¿Estás completamente seguro de que deseas eliminar permanentemente a "${lead.name}" de la Papelera?\n\n🚨 Esta acción es IRREVERSIBLE y se mantendrá excluida permanentemente de las sincronizaciones en la nube.`)) {
        state.trash = state.trash.filter(l => l.id !== id);
        
        // Mantenemos el ID en state.deletedLeads para asegurar que nunca se resucite desde la nube
        saveState();
        renderTrashList();
        alert(`Cliente "${lead.name}" eliminado de forma definitiva.`);
    }
}

// ==========================================
// DATE RANGE PICKER UI INITIALIZATION
// ==========================================
function initDateRangePicker() {
    const trigger = document.getElementById("date-range-trigger");
    const dropdown = document.getElementById("date-picker-dropdown");
    const label = document.getElementById("date-range-label");
    const presetBtns = document.querySelectorAll(".preset-btn");
    const customArea = document.getElementById("custom-range-inputs-area");
    const customStart = document.getElementById("custom-start-date");
    const customEnd = document.getElementById("custom-end-date");
    const compareCheckbox = document.getElementById("compare-period-checkbox");
    const cancelBtn = document.getElementById("btn-date-picker-cancel");
    const applyBtn = document.getElementById("btn-date-picker-apply");

    if (!trigger || !dropdown) return;

    // Toggle dropdown
    trigger.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("active");
    };

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });

    // Preset buttons click
    presetBtns.forEach(btn => {
        btn.onclick = () => {
            presetBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const preset = btn.getAttribute("data-preset");
            if (preset === "custom") {
                customArea.classList.add("active");
            } else {
                customArea.classList.remove("active");
                // Pre-fill fields for preset
                const range = getPresetDateRange(preset);
                customStart.value = range.start;
                customEnd.value = range.end;
            }
        };
    });

    // Cancel click
    cancelBtn.onclick = () => {
        dropdown.classList.remove("active");
        syncDatePickerUIFromState();
    };

    // Apply click
    applyBtn.onclick = () => {
        const activePresetBtn = document.querySelector(".preset-btn.active");
        const preset = activePresetBtn ? activePresetBtn.getAttribute("data-preset") : "este_mes";
        
        state.comparePeriod = compareCheckbox.checked;

        if (preset === "custom") {
            if (!customStart.value || !customEnd.value) {
                alert("Por favor selecciona ambas fechas (Desde y Hasta).");
                return;
            }
            if (customStart.value > customEnd.value) {
                alert("La fecha 'Desde' no puede ser posterior a la fecha 'Hasta'.");
                return;
            }
            state.dateFilterType = "range";
            state.startDate = customStart.value;
            state.endDate = customEnd.value;
            state.presetName = "custom";
            label.textContent = `${formatDateShort(customStart.value)} - ${formatDateShort(customEnd.value)}`;
        } else {
            state.dateFilterType = "preset";
            state.presetName = preset;
            const range = getPresetDateRange(preset);
            state.startDate = range.start;
            state.endDate = range.end;
            label.textContent = activePresetBtn.textContent;
        }

        dropdown.classList.remove("active");
        saveState();
        renderApp();
    };

    syncDatePickerUIFromState();
}

function formatDateShort(dateStr) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    const monthsShort = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    return `${parseInt(day, 10)} ${monthsShort[parseInt(month, 10) - 1]}`;
}

function syncDatePickerUIFromState() {
    const presetBtns = document.querySelectorAll(".preset-btn");
    const customArea = document.getElementById("custom-range-inputs-area");
    const customStart = document.getElementById("custom-start-date");
    const customEnd = document.getElementById("custom-end-date");
    const compareCheckbox = document.getElementById("compare-period-checkbox");
    const label = document.getElementById("date-range-label");

    if (!customStart) return;

    compareCheckbox.checked = state.comparePeriod || false;

    presetBtns.forEach(btn => {
        const p = btn.getAttribute("data-preset");
        if (state.dateFilterType === "month") {
            if (p === "este_mes") btn.classList.add("active");
            else btn.classList.remove("active");
        } else {
            if (p === state.presetName) btn.classList.add("active");
            else btn.classList.remove("active");
        }
    });

    if (state.dateFilterType === "month") {
        label.textContent = state.activeMonth || "Filtrar Fechas";
        customArea.classList.remove("active");
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const formatDate = (d) => {
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        };
        customStart.value = formatDate(start);
        customEnd.value = formatDate(today);
    } else {
        customStart.value = state.startDate;
        customEnd.value = state.endDate;

        if (state.presetName === "custom") {
            customArea.classList.add("active");
            label.textContent = `${formatDateShort(state.startDate)} - ${formatDateShort(state.endDate)}`;
        } else {
            customArea.classList.remove("active");
            const activeBtn = document.querySelector(`.preset-btn[data-preset="${state.presetName}"]`);
            if (activeBtn) {
                label.textContent = activeBtn.textContent;
            }
        }
    }
}

function getPresetDateRange(preset) {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    
    const formatDate = (d) => {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const todayStr = formatDate(today);

    switch (preset) {
        case "hoy":
            return { start: todayStr, end: todayStr };
        case "ayer": {
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            return { start: formatDate(yesterday), end: formatDate(yesterday) };
        }
        case "hoy_ayer": {
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            return { start: formatDate(yesterday), end: todayStr };
        }
        case "7_dias": {
            const start = new Date(today);
            start.setDate(today.getDate() - 6);
            return { start: formatDate(start), end: todayStr };
        }
        case "14_dias": {
            const start = new Date(today);
            start.setDate(today.getDate() - 13);
            return { start: formatDate(start), end: todayStr };
        }
        case "28_dias": {
            const start = new Date(today);
            start.setDate(today.getDate() - 27);
            return { start: formatDate(start), end: todayStr };
        }
        case "30_dias": {
            const start = new Date(today);
            start.setDate(today.getDate() - 29);
            return { start: formatDate(start), end: todayStr };
        }
        case "esta_semana": {
            const start = new Date(today);
            const day = start.getDay();
            const diff = start.getDate() - day + (day === 0 ? -6 : 1);
            start.setDate(diff);
            return { start: formatDate(start), end: todayStr };
        }
        case "ultima_semana": {
            const start = new Date(today);
            const day = start.getDay();
            const diff = start.getDate() - day + (day === 0 ? -6 : 1) - 7;
            start.setDate(diff);
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            return { start: formatDate(start), end: formatDate(end) };
        }
        case "este_mes": {
            const start = new Date(today.getFullYear(), today.getMonth(), 1);
            return { start: formatDate(start), end: todayStr };
        }
        case "el_mes_pasado": {
            const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            const end = new Date(today.getFullYear(), today.getMonth(), 0);
            return { start: formatDate(start), end: formatDate(end) };
        }
        case "maximo":
            return { start: "1970-01-01", end: "2099-12-31" };
        default:
            return { start: todayStr, end: todayStr };
    }
}

function getPreviousPeriodRange(startStr, endStr) {
    const start = new Date(startStr + 'T12:00:00');
    const end = new Date(endStr + 'T12:00:00');
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    const prevStart = new Date(start);
    prevStart.setDate(start.getDate() - diffDays);
    
    const prevEnd = new Date(end);
    prevEnd.setDate(end.getDate() - diffDays);
    
    const formatDate = (d) => {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };
    
    return { start: formatDate(prevStart), end: formatDate(prevEnd) };
}

function getMonthDateRange(monthName) {
    const parts = monthName.split(" ");
    if (parts.length !== 2) {
        const today = new Date();
        return { start: `${today.getFullYear()}-01-01`, end: `${today.getFullYear()}-12-31` };
    }
    const monthNamesEs = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const monthIndex = monthNamesEs.indexOf(parts[0].toLowerCase());
    const year = parseInt(parts[1], 10);
    
    if (monthIndex === -1 || isNaN(year)) {
        const today = new Date();
        return { start: `${today.getFullYear()}-01-01`, end: `${today.getFullYear()}-12-31` };
    }
    
    const start = new Date(year, monthIndex, 1);
    const end = new Date(year, monthIndex + 1, 0);
    
    const formatDate = (d) => {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };
    
    return { start: formatDate(start), end: formatDate(end) };
}

function renderCompareBadge(currentCount, prevCount, elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    if (!state.comparePeriod) {
        el.textContent = "Comparación desactivada";
        el.className = "metric-change";
        el.style.color = "var(--text-secondary)";
        return;
    }
    
    if (prevCount === 0) {
        if (currentCount === 0) {
            el.textContent = "0% vs período ant.";
            el.className = "metric-change";
            el.style.color = "var(--text-secondary)";
        } else {
            el.textContent = "+100% vs período ant.";
            el.className = "metric-change positive";
            el.style.color = "var(--success)";
        }
    } else {
        const percent = Math.round(((currentCount - prevCount) / prevCount) * 100);
        if (percent >= 0) {
            el.textContent = `+${percent}% vs período ant.`;
            el.className = "metric-change positive";
            el.style.color = "var(--success)";
        } else {
            el.textContent = `${percent}% vs período ant.`;
            el.className = "metric-change negative";
            el.style.color = "var(--danger)";
        }
    }
}

function getChartDataEvolution(leads, startStr, endStr) {
    const start = new Date(startStr + 'T00:00:00');
    const end = new Date(endStr + 'T23:59:59');
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const datasetContabilidad = {};
    const datasetSistemas = {};
    const labels = [];
    
    const formatDateLabel = (d) => {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    };

    if (diffDays <= 31) {
        const curr = new Date(start);
        while (curr <= end) {
            const label = formatDateLabel(curr);
            labels.push(label);
            datasetContabilidad[label] = 0;
            datasetSistemas[label] = 0;
            
            curr.setDate(curr.getDate() + 1);
        }
        
        leads.forEach(l => {
            if (l.date) {
                const d = new Date(l.date + 'T12:00:00');
                const label = formatDateLabel(d);
                if (label in datasetContabilidad) {
                    if (l.line === "contabilidad") datasetContabilidad[label]++;
                    else if (l.line === "sistemas") datasetSistemas[label]++;
                }
            }
        });
    } else {
        const groupFormat = diffDays > 180 ? "month" : "week";
        
        if (groupFormat === "month") {
            leads.forEach(l => {
                const monthName = l.month || "Otros";
                if (!labels.includes(monthName)) {
                    labels.push(monthName);
                    datasetContabilidad[monthName] = 0;
                    datasetSistemas[monthName] = 0;
                }
                if (l.line === "contabilidad") datasetContabilidad[monthName]++;
                else if (l.line === "sistemas") datasetSistemas[monthName]++;
            });
        } else {
            leads.forEach(l => {
                if (l.date) {
                    const d = new Date(l.date + 'T12:00:00');
                    const oneJan = new Date(d.getFullYear(), 0, 1);
                    const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
                    const weekNum = Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
                    const weekLabel = `Sem ${weekNum} (${d.getFullYear()})`;
                    
                    if (!labels.includes(weekLabel)) {
                        labels.push(weekLabel);
                        datasetContabilidad[weekLabel] = 0;
                        datasetSistemas[weekLabel] = 0;
                    }
                    if (l.line === "contabilidad") datasetContabilidad[weekLabel]++;
                    else if (l.line === "sistemas") datasetSistemas[weekLabel]++;
                }
            });
            labels.sort((a, b) => {
                const matchA = a.match(/\d+/);
                const matchB = b.match(/\d+/);
                const numA = matchA ? parseInt(matchA[0], 10) : 0;
                const numB = matchB ? parseInt(matchB[0], 10) : 0;
                return numA - numB;
            });
        }
    }
    
    return {
        labels,
        contabilidad: labels.map(l => datasetContabilidad[l] || 0),
        sistemas: labels.map(l => datasetSistemas[l] || 0)
    };
}

function renderMetricsDashboard(leads) {
    // 1. Populate Ad Spend settings fields
    const spendContabilidadEl = document.getElementById("adspend-contabilidad");
    const convsContabilidadEl = document.getElementById("adconvs-contabilidad");
    const spendSistemasEl = document.getElementById("adspend-sistemas");
    const convsSistemasEl = document.getElementById("adconvs-sistemas");
    const btnSaveAdspend = document.getElementById("btn-save-adspend");

    if (spendContabilidadEl && convsContabilidadEl && spendSistemasEl && convsSistemasEl) {
        if (document.activeElement !== spendContabilidadEl) spendContabilidadEl.value = state.adSpend.contabilidad || "";
        if (document.activeElement !== convsContabilidadEl) convsContabilidadEl.value = state.adSpend.contabilidadConvs || "";
        if (document.activeElement !== spendSistemasEl) spendSistemasEl.value = state.adSpend.sistemas || "";
        if (document.activeElement !== convsSistemasEl) convsSistemasEl.value = state.adSpend.sistemasConvs || "";
    }

    if (btnSaveAdspend) {
        btnSaveAdspend.onclick = () => {
            state.adSpend = {
                contabilidad: parseFloat(spendContabilidadEl.value) || 0,
                contabilidadConvs: parseInt(convsContabilidadEl.value, 10) || 0,
                sistemas: parseFloat(spendSistemasEl.value) || 0,
                sistemasConvs: parseInt(convsSistemasEl.value, 10) || 0
            };
            saveState();
            renderApp();
        };
    }

    // Render ad spend ROI cards
    renderRoiResults(leads);

    const totalCount = leads.length;
    const contabilidadCount = leads.filter(l => l.line === "contabilidad").length;
    const sistemasCount = leads.filter(l => l.line === "sistemas").length;

    const totalValEl = document.getElementById("metrics-stat-total");
    const contabilidadValEl = document.getElementById("metrics-stat-contabilidad");
    const sistemasValEl = document.getElementById("metrics-stat-sistemas");

    if (totalValEl) totalValEl.textContent = totalCount;
    if (contabilidadValEl) contabilidadValEl.textContent = contabilidadCount;
    if (sistemasValEl) sistemasValEl.textContent = sistemasCount;

    let prevTotal = 0, prevContabilidad = 0, prevSistemas = 0;
    
    if (state.comparePeriod) {
        let prevLeads = [];
        if (state.dateFilterType === "month") {
            const currentIndex = state.months.indexOf(state.activeMonth);
            if (currentIndex > 0) {
                const prevMonthName = state.months[currentIndex - 1];
                prevLeads = state.leads.filter(l => l.month === prevMonthName);
            }
        } else {
            const activeRange = getActiveFilterRange();
            if (activeRange) {
                const prevRange = getPreviousPeriodRange(activeRange.start, activeRange.end);
                prevLeads = state.leads.filter(l => l.date >= prevRange.start && l.date <= prevRange.end);
            }
        }
        
        prevTotal = prevLeads.length;
        prevContabilidad = prevLeads.filter(l => l.line === "contabilidad").length;
        prevSistemas = prevLeads.filter(l => l.line === "sistemas").length;
    }

    renderCompareBadge(totalCount, prevTotal, "metrics-stat-total-compare");
    renderCompareBadge(contabilidadCount, prevContabilidad, "metrics-stat-contabilidad-compare");
    renderCompareBadge(sistemasCount, prevSistemas, "metrics-stat-sistemas-compare");

    if (typeof Chart === "undefined") {
        const canvases = ["chart-leads-evolution", "chart-leads-distribution", "chart-leads-stages"];
        canvases.forEach(id => {
            const canvas = document.getElementById(id);
            if (canvas) {
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = "14px Inter, sans-serif";
                ctx.fillStyle = "#888888";
                ctx.textAlign = "center";
                ctx.fillText("Cargando gráficos (requiere conexión a internet)...", canvas.width / 2, canvas.height / 2);
            }
        });
        renderInsights(leads);
        return;
    }

    let startVal = "", endVal = "";
    if (state.dateFilterType === "month") {
        const range = getMonthDateRange(state.activeMonth);
        startVal = range.start;
        endVal = range.end;
    } else {
        const range = getActiveFilterRange();
        if (range) {
            startVal = range.start;
            endVal = range.end;
        } else {
            const today = new Date();
            startVal = `${today.getFullYear()}-01-01`;
            endVal = `${today.getFullYear()}-12-31`;
        }
    }

    if (!window.myCharts) {
        window.myCharts = {};
    }

    // Chart 1: Evolution
    const evolutionData = getChartDataEvolution(leads, startVal, endVal);
    const canvasEvolution = document.getElementById("chart-leads-evolution");
    if (canvasEvolution) {
        const ctxEvolution = canvasEvolution.getContext("2d");
        if (window.myCharts.evolution) window.myCharts.evolution.destroy();
        window.myCharts.evolution = new Chart(ctxEvolution, {
            type: "line",
            data: {
                labels: evolutionData.labels,
                datasets: [
                    {
                        label: "Contabilidad",
                        data: evolutionData.contabilidad,
                        borderColor: "#3b82f6",
                        backgroundColor: "rgba(59, 130, 246, 0.08)",
                        borderWidth: 3,
                        fill: true,
                        tension: 0.35
                    },
                    {
                        label: "Sistemas",
                        data: evolutionData.sistemas,
                        borderColor: "#ec4899",
                        backgroundColor: "rgba(236, 72, 153, 0.08)",
                        borderWidth: 3,
                        fill: true,
                        tension: 0.35
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                        labels: {
                            color: "var(--text-primary)",
                            font: { family: "Inter", weight: 600 }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: "rgba(156, 163, 175, 0.1)" },
                        ticks: { color: "var(--text-secondary)" }
                    },
                    y: {
                        grid: { color: "rgba(156, 163, 175, 0.1)" },
                        ticks: { 
                            color: "var(--text-secondary)",
                            precision: 0 
                        }
                    }
                }
            }
        });
    }

    // Chart 2: Distribution
    const canvasDistribution = document.getElementById("chart-leads-distribution");
    if (canvasDistribution) {
        const ctxDistribution = canvasDistribution.getContext("2d");
        if (window.myCharts.distribution) window.myCharts.distribution.destroy();
        window.myCharts.distribution = new Chart(ctxDistribution, {
            type: "doughnut",
            data: {
                labels: ["Contabilidad", "Sistemas"],
                datasets: [{
                    data: [contabilidadCount, sistemasCount],
                    backgroundColor: ["#3b82f6", "#ec4899"],
                    borderWidth: 2,
                    borderColor: "var(--card-bg)"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            color: "var(--text-primary)",
                            font: { family: "Inter", weight: 600 }
                        }
                    }
                }
            }
        });
    }

    // Chart 3: Stages
    const canvasStages = document.getElementById("chart-leads-stages");
    if (canvasStages) {
        const ctxStages = canvasStages.getContext("2d");
        if (window.myCharts.stages) window.myCharts.stages.destroy();
        const sCounts = FUNNEL_STAGES.map(s => leads.filter(l => l.stage === s.id).length);
        const sLabels = FUNNEL_STAGES.map(s => s.label);
        window.myCharts.stages = new Chart(ctxStages, {
            type: "bar",
            data: {
                labels: sLabels,
                datasets: [{
                    data: sCounts,
                    backgroundColor: "#6366f1",
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: "var(--text-secondary)" }
                    },
                    y: {
                        grid: { color: "rgba(156, 163, 175, 0.1)" },
                        ticks: { 
                            color: "var(--text-secondary)",
                            precision: 0 
                        }
                    }
                }
            }
        });
    }

    renderInsights(leads);
}

function renderInsights(leads) {
    const container = document.getElementById("metrics-insights-container");
    if (!container) return;

    container.innerHTML = "";
    const insights = [];

    // 1. Day of Week
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const dayCounts = [0, 0, 0, 0, 0, 0, 0];
    leads.forEach(l => {
        if (l.date) {
            const d = new Date(l.date + 'T12:00:00');
            dayCounts[d.getDay()]++;
        }
    });
    const maxDayVal = Math.max(...dayCounts);
    const maxDayIndex = dayCounts.indexOf(maxDayVal);
    const totalWithDates = dayCounts.reduce((a, b) => a + b, 0);
    if (totalWithDates > 0 && maxDayVal > 0) {
        const percentage = Math.round((maxDayVal / totalWithDates) * 100);
        insights.push({
            type: "success",
            icon: "📅",
            title: `Día de mayor captación: ${dayNames[maxDayIndex]}s`,
            text: `Los ${dayNames[maxDayIndex]}s representan el ${percentage}% de tus nuevos contactos ingresados en este período (total de ${maxDayVal} leads).`
        });
    }

    // 2. Campaign Dominance
    const contabilidadCount = leads.filter(l => l.line === "contabilidad").length;
    const sistemasCount = leads.filter(l => l.line === "sistemas").length;
    if (contabilidadCount > 0 || sistemasCount > 0) {
        const dominant = contabilidadCount >= sistemasCount ? "Contabilidad" : "Sistemas";
        const dominantCount = Math.max(contabilidadCount, sistemasCount);
        const total = contabilidadCount + sistemasCount;
        const percentage = Math.round((dominantCount / total) * 100);
        insights.push({
            type: "success",
            icon: "🎯",
            title: `Campaña dominante: ${dominant}`,
            text: `El rubro de ${dominant} lidera el período con ${dominantCount} nuevos leads, representando el ${percentage}% de la captación total.`
        });
    }

    // 3. Inactivity Warning
    const inactiveCount = leads.filter(l => l.stage !== "ganado" && l.stage !== "perdido" && getDaysSinceLastUpdate(l) >= 3).length;
    if (inactiveCount > 0) {
        insights.push({
            type: "warning",
            icon: "⚠️",
            title: `Alerta de Inactividad de Clientes`,
            text: `Hay ${inactiveCount} clientes activos que no registran comentarios ni actualizaciones hace más de 3 días. Considera enviar un mensaje de seguimiento de inmediato.`
        });
    }

    // 4. Bottleneck Stage
    const stagesOrder = ["contacto_inicial", "llamada", "asesoria", "cotizacion", "seguimiento"];
    const stageLabels = ["Contacto Inicial", "Llamada / Contacto", "Asesoría Gratis", "Cotización Enviada", "Seguimiento"];
    const stageCounts = stagesOrder.map(s => leads.filter(l => l.stage === s).length);
    const maxStageVal = Math.max(...stageCounts);
    const maxStageIndex = stageCounts.indexOf(maxStageVal);
    if (maxStageVal > 0) {
        insights.push({
            type: "warning",
            icon: "⚡",
            title: `Acumulación de Leads: ${stageLabels[maxStageIndex]}`,
            text: `La etapa '${stageLabels[maxStageIndex]}' tiene la mayor concentración de leads activos (${maxStageVal} clientes). Revisa si hay cuellos de botella para avanzar las propuestas.`
        });
    }

    if (insights.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); padding: 20px 0; font-size: 0.85rem;">
                No hay suficientes datos históricos en este período para generar patrones de comportamiento.
            </div>
        `;
        return;
    }

    insights.forEach(ins => {
        const item = document.createElement("div");
        item.className = `insight-item ${ins.type}`;
        item.innerHTML = `
            <div class="insight-icon">${ins.icon}</div>
            <div class="insight-content">
                <span class="insight-title">${ins.title}</span>
                <span class="insight-text">${ins.text}</span>
            </div>
        `;
        container.appendChild(item);
    });
}

function renderRoiResults(leads) {
    const resultsGrid = document.getElementById("adspend-results-grid");
    if (!resultsGrid) return;
    
    const contabilidadCount = leads.filter(l => l.line === "contabilidad").length;
    const sistemasCount = leads.filter(l => l.line === "sistemas").length;
    const totalCount = leads.length;
    
    const contabilidadWon = leads.filter(l => l.line === "contabilidad" && l.stage === "ganado").length;
    const sistemasWon = leads.filter(l => l.line === "sistemas" && l.stage === "ganado").length;
    
    const cSpend = state.adSpend.contabilidad || 0;
    const cConvs = state.adSpend.contabilidadConvs || 0;
    const sSpend = state.adSpend.sistemas || 0;
    const sConvs = state.adSpend.sistemasConvs || 0;
    
    const totalSpend = cSpend + sSpend;
    const totalConvs = cConvs + sConvs;
    
    const cCpc = cConvs > 0 ? (cSpend / cConvs).toFixed(2) : "0.00";
    const cCpl = contabilidadCount > 0 ? (cSpend / contabilidadCount).toFixed(2) : "0.00";
    const cCac = contabilidadWon > 0 ? (cSpend / contabilidadWon).toFixed(2) : "0.00";
    
    const sCpc = sConvs > 0 ? (sSpend / sConvs).toFixed(2) : "0.00";
    const sCpl = sistemasCount > 0 ? (sSpend / sistemasCount).toFixed(2) : "0.00";
    const sCac = sistemasWon > 0 ? (sSpend / sistemasWon).toFixed(2) : "0.00";
    
    const avgCpc = totalConvs > 0 ? (totalSpend / totalConvs).toFixed(2) : "0.00";
    const avgCpl = totalCount > 0 ? (totalSpend / totalCount).toFixed(2) : "0.00";
    const totalWon = contabilidadWon + sistemasWon;
    const avgCac = totalWon > 0 ? (totalSpend / totalWon).toFixed(2) : "0.00";
    
    resultsGrid.innerHTML = `
        <!-- Total ROI Card -->
        <div class="metric-card" style="border-top: 4px solid var(--primary);">
            <div class="card-icon blue">
                <i data-lucide="wallet"></i>
            </div>
            <div class="metric-data">
                <span class="metric-value">S/ ${totalSpend.toFixed(2)}</span>
                <span class="metric-label">Gasto Total Publicidad</span>
            </div>
            <div class="metric-change positive" style="font-weight:700; color:var(--primary); font-size: 0.8rem;">
                CPL Promedio: S/ ${avgCpl}
            </div>
        </div>
        
        <!-- Contabilidad ROI Card -->
        <div class="metric-card" style="border-top: 4px solid var(--line-contabilidad);">
            <div class="card-icon pink">
                <i data-lucide="trending-up"></i>
            </div>
            <div class="metric-data">
                <span class="metric-value" style="font-size: 1.15rem; font-weight:800;">S/ ${cCpl} CPL</span>
                <span class="metric-label">Costo por Lead Contabilidad</span>
            </div>
            <div class="metric-change" style="font-size:0.75rem; color:var(--text-secondary); line-height: 1.3;">
                Costo por Conversación: <strong>S/ ${cCpc}</strong><br>
                Inversión: S/ ${cSpend.toFixed(2)} | Convs: ${cConvs}<br>
                Costo por Adquisición (CAC): <strong>S/ ${cCac}</strong>
            </div>
        </div>
        
        <!-- Sistemas ROI Card -->
        <div class="metric-card" style="border-top: 4px solid var(--line-sistemas);">
            <div class="card-icon cyan">
                <i data-lucide="trending-up"></i>
            </div>
            <div class="metric-data">
                <span class="metric-value" style="font-size: 1.15rem; font-weight:800;">S/ ${sCpl} CPL</span>
                <span class="metric-label">Costo por Lead Sistemas / IT</span>
            </div>
            <div class="metric-change" style="font-size:0.75rem; color:var(--text-secondary); line-height: 1.3;">
                Costo por Conversación: <strong>S/ ${sCpc}</strong><br>
                Inversión: S/ ${sSpend.toFixed(2)} | Convs: ${sConvs}<br>
                Costo por Adquisición (CAC): <strong>S/ ${sCac}</strong>
            </div>
        </div>
    `;
    
    lucide.createIcons();
}


