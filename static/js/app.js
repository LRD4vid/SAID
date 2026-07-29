// ── DATA ──
const MONTHS_ES=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MONTHS_S=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const today=new Date(); const TY=today.getFullYear(),TM=today.getMonth(),TD=today.getDate();
let viewY=2025,viewM=5,miniY=2025,miniM=5;
let selectedColor='ev-ind';
let taskFilter='all';
let currentDetailId=null;

let tasks=[
  {id:1,title:'Proyecto BD – Diagrama E/R',desc:'Entregar el diagrama entidad-relación del proyecto final.',date:'2025-06-05',time:'23:59',subject:'Bases de Datos',priority:'alta',color:'ev-vio',status:'completada'},
  {id:2,title:'Quiz algoritmos',desc:'Evaluación de 20 minutos sobre algoritmos de ordenamiento.',date:'2025-06-09',time:'08:00',subject:'Programación de Software',priority:'alta',color:'ev-amb',status:'completada'},
  {id:3,title:'Entrega parcial – módulo 3',desc:'Subir avance del 50% del módulo 3.',date:'2025-06-12',time:'23:59',subject:'Análisis y Diseño',priority:'media',color:'ev-ind',status:'completada'},
  {id:4,title:'Tarea inglés técnico',desc:'Traducir el capítulo 4 del libro de texto.',date:'2025-06-14',time:'12:00',subject:'Inglés Técnico',priority:'baja',color:'ev-blu',status:'pendiente'},
  {id:5,title:'Examen parcial BD',desc:'Evaluación escrita sobre SQL y normalización.',date:'2025-06-17',time:'10:00',subject:'Bases de Datos',priority:'alta',color:'ev-vio',status:'en progreso'},
  {id:6,title:'Proyecto programación v1',desc:'Primera versión funcional del proyecto semestral.',date:'2025-06-20',time:'23:59',subject:'Programación de Software',priority:'alta',color:'ev-ind',status:'pendiente'},
  {id:7,title:'Foro ética y valores',desc:'Participar en el foro virtual con mínimo 2 respuestas.',date:'2025-06-21',time:'11:00',subject:'Ética y Valores',priority:'baja',color:'ev-grn',status:'pendiente'},
  {id:8,title:'Sustentación proyecto BD',desc:'Presentación oral del proyecto final de bases de datos.',date:'2025-06-25',time:'09:00',subject:'Bases de Datos',priority:'alta',color:'ev-vio',status:'pendiente'},
  {id:9,title:'Examen final programación',desc:'Examen integrador del semestre.',date:'2025-06-28',time:'14:00',subject:'Programación de Software',priority:'alta',color:'ev-amb',status:'vencida'},
  {id:10,title:'Análisis de requerimientos SAID',desc:'Documentar los requerimientos funcionales del sistema SAID.',date:'2025-06-13',time:'23:59',subject:'Análisis y Diseño',priority:'media',color:'ev-ind',status:'vencida'},
];

const notifications=[
  {id:1,icon:'⚠️',bg:'#FEF3C7',title:'Tarea próxima a vencer',desc:'El examen parcial de Bases de Datos vence mañana a las 10:00 AM.',time:'Hace 15 min',unread:true,type:'warning'},
  {id:2,icon:'🔔',bg:'#DBEAFE',title:'Recordatorio activado',desc:'Se programó un recordatorio para "Foro ética y valores" 1 hora antes.',time:'Hace 2 horas',unread:true,type:'info'},
  {id:3,icon:'✅',bg:'#D1FAE5',title:'Tarea completada',desc:'Marcaste como completada: "Entrega parcial – módulo 3".',time:'Hace 3 horas',unread:true,type:'success'},
  {id:4,icon:'❌',bg:'#FEE2E2',title:'Tarea vencida',desc:'"Análisis de requerimientos SAID" venció sin ser completada.',time:'Ayer',unread:false,type:'danger'},
  {id:5,icon:'📅',bg:'#EDE9FE',title:'Nuevo evento en el calendario',desc:'Se agregó el evento "Quiz algoritmos" para el 9 de junio.',time:'Hace 2 días',unread:false,type:'info'},
];

const reminders=[
  {id:1,icon:'📖',bg:'#E0E7FF',title:'Examen parcial BD',sub:'Bases de Datos · 17 junio',time:'24 horas antes',on:true},
  {id:2,icon:'💻',bg:'#EDE9FE',title:'Proyecto programación v1',sub:'Programación · 20 junio',time:'12 horas antes',on:true},
  {id:3,icon:'🗣️',bg:'#D1FAE5',title:'Sustentación proyecto BD',sub:'Bases de Datos · 25 junio',time:'1 hora antes',on:true},
  {id:4,icon:'🌐',bg:'#DBEAFE',title:'Foro ética y valores',sub:'Ética y Valores · 21 junio',time:'30 minutos antes',on:false},
  {id:5,icon:'📝',bg:'#FEF3C7',title:'Tarea inglés técnico',sub:'Inglés Técnico · 14 junio',time:'1 hora antes',on:true},
  {id:6,icon:'🧮',bg:'#FEE2E2',title:'Examen final programación',sub:'Programación · 28 junio',time:'24 horas antes',on:true},
];

const tracking=[
  {subject:'Programación de Software',total:5,done:2,color:'#4F46E5',bg:'#E0E7FF'},
  {subject:'Bases de Datos',total:4,done:2,color:'#7C3AED',bg:'#EDE9FE'},
  {subject:'Análisis y Diseño',total:3,done:1,color:'#2563EB',bg:'#DBEAFE'},
  {subject:'Inglés Técnico',total:2,done:1,color:'#059669',bg:'#D1FAE5'},
  {subject:'Ética y Valores',total:2,done:0,color:'#D97706',bg:'#FEF3C7'},
];

const activity=[
  {icon:'✅',bg:'#D1FAE5',text:'Completaste "Entrega parcial – módulo 3"',time:'Hace 3 horas'},
  {icon:'➕',bg:'#E0E7FF',text:'Creaste tarea "Análisis de requerimientos SAID"',time:'Ayer'},
  {icon:'📅',bg:'#EDE9FE',text:'Agregaste evento "Examen parcial BD" al calendario',time:'Hace 2 días'},
  {icon:'🔔',bg:'#FEF3C7',text:'Activaste recordatorio para "Proyecto programación v1"',time:'Hace 3 días'},
];

// ── SCREENS ──
function showScreen(name){
  document.querySelectorAll('.auth-screen,.app-layout').forEach(el=>{el.classList.remove('active')});
  const el=document.getElementById('screen-'+name);
  if(el) el.classList.add('active');
}
function doLogin(){showScreen('app');renderAll()}
function doLogout(){showScreen('login')}

// ── VIEWS ──
function goView(name,btn){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(btn) btn.classList.add('active');
  const titles={dashboard:'Dashboard',tasks:'Tareas',calendar:'Calendario',reminders:'Recordatorios',notifications:'Notificaciones',tracking:'Seguimiento académico',profile:'Perfil',settings:'Configuración'};
  document.getElementById('topbar-title').textContent=titles[name]||name;
  document.getElementById('topbar-sub').textContent='';
  if(name==='calendar') renderCalendar();
  if(name==='tasks') renderTasks();
  if(name==='reminders') renderReminders();
  if(name==='notifications') renderNotifications();
  if(name==='tracking') renderTracking();
}

// ── RENDER ALL ──
function renderAll(){renderDashboard();renderCalendar();renderTasks();renderReminders();renderNotifications();renderTracking()}

// ── DASHBOARD ──
function renderDashboard(){
  const pend=tasks.filter(t=>t.status==='pendiente').length;
  const done=tasks.filter(t=>t.status==='completada').length;
  const venc=tasks.filter(t=>t.status==='vencida').length;
  document.getElementById('ds-pend').textContent=pend;
  document.getElementById('ds-done').textContent=done;
  document.getElementById('ds-overdue').textContent=venc;
  document.getElementById('nb-tasks').textContent=pend;

  const colorMap={'ev-ind':'#4F46E5','ev-vio':'#7C3AED','ev-grn':'#059669','ev-amb':'#D97706','ev-red':'#DC2626','ev-blu':'#2563EB'};
  const dt=document.getElementById('dash-tasks');
  const recent=[...tasks].slice(-5).reverse();
  dt.innerHTML=recent.map(t=>{
    const sc=t.status==='completada';
    const pc=t.priority==='alta'?'p-alta':t.priority==='media'?'p-media':'p-baja';
    const pl=t.priority.charAt(0).toUpperCase()+t.priority.slice(1);
    return `<div class="task-row" onclick="openDetail(${t.id})">
      <div class="task-check ${sc?'done':''}" onclick="event.stopPropagation();toggleTask(${t.id},this)">${sc?'✓':''}</div>
      <div class="task-text">
        <div class="task-name ${sc?'done':''}">${t.title}</div>
        <div class="task-meta">${t.subject} · ${t.date} ${t.time}</div>
      </div>
      <div class="pbadge ${pc}">${pl}</div>
    </div>`;
  }).join('');

  const dn=document.getElementById('dash-notifs');
  dn.innerHTML=notifications.slice(0,3).map(n=>`
    <div class="notif-item">
      <div class="notif-dot2" style="background:${n.type==='warning'?'#D97706':n.type==='success'?'#059669':n.type==='danger'?'#DC2626':'#4F46E5'}"></div>
      <div><div class="notif-txt">${n.title}</div><div class="notif-time">${n.time}</div></div>
    </div>`).join('');

  const da=document.getElementById('dash-activity');
  da.innerHTML=activity.map(a=>`
    <div class="activity-item">
      <div class="activity-icon" style="background:${a.bg}">${a.icon}</div>
      <div><div style="font-size:12px;color:var(--g700)">${a.text}</div><div style="font-size:11px;color:var(--g400);margin-top:1px">${a.time}</div></div>
    </div>`).join('');

  const dp=document.getElementById('dash-progress');
  dp.innerHTML=tracking.map(tr=>{
    const pct=Math.round((tr.done/tr.total)*100);
    return `<div>
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <div style="font-size:12px;font-weight:500;color:var(--g800)">${tr.subject}</div>
        <div style="font-size:12px;color:var(--g500)">${tr.done}/${tr.total}</div>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${tr.color}"></div></div>
      <div style="font-size:11px;color:var(--g400);margin-top:3px">${pct}% completado</div>
    </div>`;
  }).join('');
}

// ── TASKS ──
let taskSearchTerm='';
function setFilter(f,btn){
  taskFilter=f;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderTasks();
}
function filterTasks(){taskSearchTerm=document.getElementById('task-search').value.toLowerCase();renderTasks()}
function renderTasks(){
  const colorMap={'ev-ind':'#4F46E5','ev-vio':'#7C3AED','ev-grn':'#059669','ev-amb':'#D97706','ev-red':'#DC2626','ev-blu':'#2563EB'};
  let filtered=tasks.filter(t=>{
    const matchFilter=taskFilter==='all'||t.status===taskFilter;
    const matchSearch=!taskSearchTerm||t.title.toLowerCase().includes(taskSearchTerm)||t.subject.toLowerCase().includes(taskSearchTerm);
    return matchFilter&&matchSearch;
  });
  const grid=document.getElementById('tasks-grid');
  if(!filtered.length){grid.innerHTML=`<div class="empty" style="grid-column:1/-1"><div class="empty-icon">📭</div><div class="empty-title">Sin tareas</div><div class="empty-sub">No se encontraron tareas con los filtros seleccionados.</div></div>`;return}
  grid.innerHTML=filtered.map(t=>{
    const pc=t.priority==='alta'?'p-alta':t.priority==='media'?'p-media':'p-baja';
    const pl=t.priority.charAt(0).toUpperCase()+t.priority.slice(1);
    const sc=t.status==='completada'?'s-done':t.status==='en progreso'?'s-prog':t.status==='vencida'?'s-venc':'s-pend';
    const sl=t.status.charAt(0).toUpperCase()+t.status.slice(1);
    return `<div class="task-card">
      <div class="color-bar" style="background:${colorMap[t.color]||'#4F46E5'}"></div>
      <div class="task-card-top">
        <div class="task-card-header">
          <div class="task-card-title">${t.title}</div>
          <div class="task-actions">
            <button class="act-btn" title="Ver" onclick="openDetail(${t.id})">👁</button>
            <button class="act-btn" title="Eliminar" onclick="deleteTask(${t.id})">🗑</button>
          </div>
        </div>
        <div class="task-card-body">${t.desc}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span class="pbadge ${pc}">${pl}</span>
          <span class="status-badge ${sc}">${sl}</span>
        </div>
      </div>
      <div class="task-card-footer">
        <div class="task-card-date">📅 ${t.date} · ${t.time}</div>
        <div class="task-card-subject">${t.subject.split(' ')[0]}</div>
      </div>
    </div>`;
  }).join('');
}

// ── CALENDAR ──
function getEvs(y,m,d){
  const k=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  return tasks.filter(t=>t.date===k);
}
function renderMini(){
  document.getElementById('mini-lbl').textContent=MONTHS_S[miniM]+' '+miniY;
  const g=document.getElementById('mini-grid');
  g.innerHTML=['D','L','M','X','J','V','S'].map(d=>`<div class="mini-dow">${d}</div>`).join('');
  const first=new Date(miniY,miniM,1).getDay();
  const days=new Date(miniY,miniM+1,0).getDate();
  const prev=new Date(miniY,miniM,0).getDate();
  for(let i=0;i<first;i++) g.innerHTML+=`<div class="mini-day other-month">${prev-first+1+i}</div>`;
  for(let d=1;d<=days;d++){
    const it=d===TD&&miniM===TM&&miniY===TY;
    const he=getEvs(miniY,miniM,d).length>0;
    g.innerHTML+=`<div class="mini-day${it?' today':''}${he?' has-ev':''}">${d}</div>`;
  }
  const rem=42-first-days;
  for(let d=1;d<=rem;d++) g.innerHTML+=`<div class="mini-day other-month">${d}</div>`;
}
function miniNav(dir){miniM+=dir;if(miniM>11){miniM=0;miniY++}if(miniM<0){miniM=11;miniY--}renderMini()}

function renderCalGrid(){
  document.getElementById('cal-lbl').textContent=MONTHS_ES[viewM]+' '+viewY;
  const g=document.getElementById('cal-grid');g.innerHTML='';
  const first=new Date(viewY,viewM,1).getDay();
  const days=new Date(viewY,viewM+1,0).getDate();
  const prev=new Date(viewY,viewM,0).getDate();
  function makeCell(d,cls,evs,y,m){
    const cell=document.createElement('div');
    cell.className='cal-cell '+cls;
    cell.innerHTML=`<div class="day-num">${d}</div>`;
    evs.slice(0,2).forEach(ev=>{
      const ch=document.createElement('div');
      ch.className=`ev-chip ${ev.color}`;ch.textContent=ev.title;
      ch.onclick=e=>{e.stopPropagation();openDetail(ev.id)};
      cell.appendChild(ch);
    });
    if(evs.length>2){const m2=document.createElement('div');m2.className='more-ev';m2.textContent=`+${evs.length-2} más`;cell.appendChild(m2)}
    cell.onclick=()=>openNewTaskDate(y,m,d);
    return cell;
  }
  for(let i=0;i<first;i++){const d=prev-first+1+i;g.appendChild(makeCell(d,'other-month',getEvs(viewY,viewM>0?viewM-1:11,d),viewY,viewM>0?viewM-1:11))}
  for(let d=1;d<=days;d++){const it=d===TD&&viewM===TM&&viewY===TY;g.appendChild(makeCell(d,it?'today':'',getEvs(viewY,viewM,d),viewY,viewM))}
  const rem2=42-first-days;
  for(let d=1;d<=rem2;d++) g.appendChild(makeCell(d,'other-month',getEvs(viewY,viewM<11?viewM+1:0,d),viewY,viewM<11?viewM+1:0));

  // upcoming
  const ul=document.getElementById('upcoming-list');
  const colorHex={'ev-ind':'#4F46E5','ev-vio':'#7C3AED','ev-grn':'#059669','ev-amb':'#D97706','ev-red':'#DC2626','ev-blu':'#2563EB'};
  const sorted=[...tasks].filter(t=>t.status!=='completada').sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5);
  ul.innerHTML=sorted.map(t=>`
    <div class="upcoming-item" onclick="openDetail(${t.id})">
      <div class="up-dot" style="background:${colorHex[t.color]||'#4F46E5'}"></div>
      <div class="up-info"><div class="up-name">${t.title}</div><div class="up-meta">${t.subject} · ${t.date}</div></div>
    </div>`).join('');
}
function calNav(dir){viewM+=dir;if(viewM>11){viewM=0;viewY++}if(viewM<0){viewM=11;viewY--}miniM=viewM;miniY=viewY;renderCalendar()}
function calToday(){viewY=TY;viewM=TM;miniY=TY;miniM=TM;renderCalendar()}
function renderCalendar(){renderMini();renderCalGrid()}

// ── REMINDERS ──
function renderReminders(){
  const r=document.getElementById('reminders-list');
  r.innerHTML=reminders.map((rem,i)=>`
    <div class="reminder-card">
      <div class="rem-icon" style="background:${rem.bg}">${rem.icon}</div>
      <div class="rem-info">
        <div class="rem-title">${rem.title}</div>
        <div class="rem-sub">${rem.sub}</div>
        <div class="rem-time">${rem.time}</div>
      </div>
      <button class="toggle ${rem.on?'on':'off'}" onclick="toggleRem(${i})"></button>
    </div>`).join('');
}
function toggleRem(i){reminders[i].on=!reminders[i].on;renderReminders()}

// ── NOTIFICATIONS ──
function renderNotifications(){
  const l=document.getElementById('notifs-list');
  l.innerHTML=notifications.map(n=>`
    <div class="notif-card ${n.unread?'unread':''}">
      <div class="notif-icon2" style="background:${n.bg}">${n.icon}</div>
      <div class="notif-body">
        <div class="notif-title">${n.title}</div>
        <div class="notif-desc">${n.desc}</div>
        <div class="notif-ts">${n.time}</div>
      </div>
      ${n.unread?`<div class="notif-badge" style="background:var(--ind-l);color:var(--ind);flex-shrink:0;align-self:flex-start;margin-top:2px">Nueva</div>`:''}
    </div>`).join('');
  const unread=notifications.filter(n=>n.unread).length;
  document.getElementById('nb-notif').textContent=unread||'';
}
function markAllRead(){notifications.forEach(n=>n.unread=false);renderNotifications();document.querySelector('.notif-dot').style.display='none';showToast('✅ Todas marcadas como leídas')}

// ── TRACKING ──
function renderTracking(){
  const g=document.getElementById('tracking-grid');
  g.innerHTML=tracking.map(tr=>{
    const pct=Math.round((tr.done/tr.total)*100);
    return `<div class="track-card">
      <div class="track-subject" style="background:${tr.bg};color:${tr.color}">${tr.subject}</div>
      <div class="track-pct">${pct}%</div>
      <div class="track-lbl">${tr.done} de ${tr.total} tareas completadas</div>
      <div class="progress-bar" style="margin-top:10px"><div class="progress-fill" style="width:${pct}%;background:${tr.color}"></div></div>
    </div>`;
  }).join('');
  const h=document.getElementById('tracking-history');
  const allDone=tasks.filter(t=>t.status==='completada');
  h.innerHTML=allDone.length?allDone.map(t=>`
    <div class="activity-item">
      <div class="activity-icon" style="background:#D1FAE5">✅</div>
      <div><div style="font-size:12px;color:var(--g700)">${t.title}</div><div style="font-size:11px;color:var(--g400)">${t.subject} · ${t.date}</div></div>
      <div class="pbadge p-baja" style="flex-shrink:0">Completada</div>
    </div>`).join(''):`<div class="empty"><div class="empty-icon">📊</div><div class="empty-title">Sin actividad aún</div></div>`;
}

// ── MODAL TASK ──
function openNewTask(){
  const d=new Date();
  document.getElementById('tm-date').value=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  document.getElementById('tm-name').value='';
  document.getElementById('tm-desc').value='';
  document.getElementById('task-modal').classList.add('open');
}
function openNewTaskDate(y,m,d){
  document.getElementById('tm-date').value=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  document.getElementById('tm-name').value='';
  document.getElementById('task-modal').classList.add('open');
}
function openModal(id,e){if(!e||e.target===document.getElementById(id)) document.getElementById(id).classList.add('open')}
function closeModal(id,e){if(!e||e.target===document.getElementById(id)) document.getElementById(id).classList.remove('open')}
function selColor(el){document.querySelectorAll('.c-dot').forEach(d=>d.classList.remove('selected'));el.classList.add('selected');selectedColor=el.dataset.c}
function saveTask(){
  const name=document.getElementById('tm-name').value.trim();
  if(!name){alert('Por favor ingresa un título');return}
  const t={
    id:Date.now(),title:name,
    desc:document.getElementById('tm-desc').value,
    date:document.getElementById('tm-date').value,
    time:document.getElementById('tm-time').value,
    subject:document.getElementById('tm-subject').value,
    priority:document.getElementById('tm-priority').value,
    color:selectedColor||'ev-ind',status:'pendiente'
  };
  tasks.push(t);
  closeModal('task-modal');
  renderAll();
  showToast('✅ Tarea guardada correctamente');
}
function toggleTask(id,el){
  const t=tasks.find(t=>t.id===id);
  if(!t) return;
  t.status=t.status==='completada'?'pendiente':'completada';
  renderAll();
}
function deleteTask(id){tasks=tasks.filter(t=>t.id!==id);renderAll();showToast('🗑️ Tarea eliminada')}
function deleteCurrentTask(){if(currentDetailId){deleteTask(currentDetailId);closeModal('ev-detail-modal')}};

// ── EVENT DETAIL ──
function openDetail(id){
  const t=tasks.find(t=>t.id===id);if(!t) return;
  currentDetailId=id;
  const colorHex={'ev-ind':'#4F46E5','ev-vio':'#7C3AED','ev-grn':'#059669','ev-amb':'#D97706','ev-red':'#DC2626','ev-blu':'#2563EB'};
  const colorClass={'ev-ind':'ev-ind','ev-vio':'ev-vio','ev-grn':'ev-grn','ev-amb':'ev-amb','ev-red':'ev-red','ev-blu':'ev-blu'};
  const badge=document.getElementById('ev-badge');
  badge.className='ev-type-badge '+(colorClass[t.color]||'ev-ind');
  badge.textContent='📚 '+t.subject;
  document.getElementById('ev-title').textContent=t.title;
  document.getElementById('ev-meta').innerHTML=`
    <div class="ev-meta-row">📅 ${t.date} · ${t.time}</div>
    <div class="ev-meta-row">📌 ${t.subject}</div>`;
  const pc=t.priority==='alta'?'p-alta':t.priority==='media'?'p-media':'p-baja';
  const sc=t.status==='completada'?'s-done':t.status==='en progreso'?'s-prog':t.status==='vencida'?'s-venc':'s-pend';
  document.getElementById('ev-body').innerHTML=`
    <div><div class="d-lbl">Descripción</div><div class="d-val">${t.desc||'Sin descripción.'}</div></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <div><div class="d-lbl">Prioridad</div><span class="pbadge ${pc}">${t.priority.charAt(0).toUpperCase()+t.priority.slice(1)}</span></div>
      <div><div class="d-lbl">Estado</div><span class="status-badge ${sc}">${t.status.charAt(0).toUpperCase()+t.status.slice(1)}</span></div>
    </div>`;
  document.getElementById('ev-detail-modal').classList.add('open');
}

// ── TOAST ──
let toastTimer;
function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2800);
}

// ── VIEW TABS ──
document.querySelectorAll('.view-tabs').forEach(tabs=>{
  tabs.querySelectorAll('.view-tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      tabs.querySelectorAll('.view-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});

// ── DARK MODE ──
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme',theme);
  const settingsToggle=document.getElementById('theme-toggle-settings');
  if(settingsToggle){
    settingsToggle.classList.toggle('on',theme==='dark');
    settingsToggle.classList.toggle('off',theme!=='dark');
  }
  try{localStorage.setItem('said-theme',theme)}catch(e){}
}
function toggleTheme(){
  const current=document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';
  applyTheme(current==='dark'?'light':'dark');
}
(function initTheme(){
  let saved='light';
  try{saved=localStorage.getItem('said-theme')||'light'}catch(e){}
  if(saved!=='dark'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){
    saved='dark';
  }
  applyTheme(saved);
})();
