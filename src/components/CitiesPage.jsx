const cities = [
  {
    id: "korla", name: "Korla", native: "库尔勒", region: "Xinjiang, China", date: "~2018",
    title: "An oasis at the edge of the desert.",
    description: "Sand dunes meet a green riverbank. Beyond the poplars, a modern city rises into the wide Xinjiang sky.",
    details: "Desert light / Peacock River / New horizons",
    background: "#ead8ad", foreground: "#244d3d", accent: "#526341",
  },
  {
    id: "beijing", name: "Beijing", native: "北京", region: "China’s capital", date: "~2023",
    title: "Imperial roots. A global outlook.",
    description: "Palace roofs and glass towers share the skyline. A capital with centuries beneath its feet and the world at its door.",
    details: "Ancient axis / Glass towers / Global ambition",
    background: "#b94132", foreground: "#fff0d3", accent: "#ffe1b3",
  },
  {
    id: "berkeley", name: "Berkeley", native: "伯克利", region: "California, USA", date: "2022",
    title: "Big ideas, with a view of the Bay.",
    description: "The Campanile above the trees, San Francisco across the water. UC Berkeley brings restless curiosity to a sunlit college town.",
    details: "UC Berkeley / Open minds / Bay light",
    background: "#c7d9da", foreground: "#173f53", accent: "#325d6a",
  },
  {
    id: "new-york", name: "New York", native: "纽约", region: "New York, USA", date: "2023~",
    title: "Every world, on one island.",
    description: "A vertical city in constant motion. A thousand languages, late-night windows, and a different world on every block.",
    details: "Skyline / Many cultures / Never still",
    background: "#232b45", foreground: "#f5eee0", accent: "#dfc3ed",
  },
];

// Original vector cityscapes keep the panels sharp and reserve their space
// immediately, without waiting for remote images or entrance animations.
function Cityscape({ city }) {
  return (
    <svg viewBox="0 0 600 300" fill="none" aria-hidden="true" focusable="false" className="block h-auto w-full">
      {city === "korla" && <>
        <circle cx="461" cy="72" r="43" fill="#f8efcc" />
        <path d="M0 156Q100 69 250 143T600 126V300H0Z" fill="#d4ad70" />
        <path d="M0 197Q142 102 332 185T600 164V300H0Z" fill="#c48f50" />
        <path d="M0 223Q130 181 269 216T600 206V300H0Z" fill="#79875a" />
        <g fill="#708377">
          <path d="M296 207V127H320V207M329 210V112H352V210M360 212V142H389V212M398 216V99H419V216M428 218V135H455V218M465 219V157H487V219" />
          <path d="M337 112V101H345V112M405 99V87H412V99" />
        </g>
        <g stroke="#cbd3a2" strokeWidth="2" opacity=".8">
          <path d="M302 138H313M302 149H313M302 160H313M302 171H313M335 127H346M335 139H346M335 151H346M335 163H346M404 116H413M404 129H413M404 142H413M434 150H448M434 164H448M434 178H448" />
        </g>
        <path d="M600 231Q355 211 246 254Q179 278 0 270V300H600Z" fill="#347775" />
        <path d="M599 244Q382 226 267 267M433 271H544M74 286H188" stroke="#abd0b5" strokeWidth="2" />
        <path d="M0 243Q76 223 157 246T283 248Q146 289 0 280Z" fill="#345c43" />
        {[44, 85, 126, 183, 229, 514, 554].map((x, i) => <g key={x}>
          <path d={`M${x} ${235 + i % 3 * 3}v-47`} stroke="#455638" strokeWidth="3" />
          <ellipse cx={x} cy={193 + i % 3 * 4} rx="9" ry="29" fill={i % 2 ? "#476b43" : "#607b42"} />
        </g>)}
        <path d="M0 294Q178 303 335 283T600 288V300H0Z" fill="#dec08a" />
      </>}
      {city === "beijing" && <>
        <circle cx="156" cy="79" r="48" fill="#e99265" />
        <g fill="#d06a51">
          <path d="M0 251V170H40V251M50 251V132H88V251M98 251V158H132V251M305 251V149H344V251M519 251V111H548V251M559 251V156H600V251" />
          <path d="M452 251C461 198 463 130 455 78L471 43L488 78C479 130 482 198 491 251Z" />
        </g>
        <path d="M339 240L326 108H366L390 170H419L405 92H447L462 206H375L363 144H355L365 240Z" fill="#642f32" />
        <g stroke="#b66d5b" strokeWidth="1.5">
          <path d="M335 122L363 136M338 143L369 158M340 164L375 181M342 185L378 202M344 207L362 219M416 111L446 127M419 134L449 150M422 157L452 174M425 180L456 197" />
        </g>
        <path d="M0 263H600V300H0Z" fill="#8a352e" />
        <path d="M82 263V229H276V263" fill="#e0a36c" />
        <path d="M108 228V196H252V228" fill="#73372d" />
        <path d="M91 199Q131 184 143 170H218Q231 185 270 199Z" fill="#f0bf7e" />
        <path d="M137 173Q161 161 180 146Q197 162 224 173Z" fill="#f2c98b" />
        <path d="M66 234Q91 221 111 211H247Q266 224 294 234Z" fill="#f2c98b" />
        <g stroke="#efbb7c" strokeWidth="5"><path d="M126 202V221M153 202V221M180 202V221M207 202V221M234 202V221" /></g>
        <g fill="#77352f"><path d="M118 263V245H132V263M159 263V245H173V263M200 263V245H214V263M241 263V245H255V263" /></g>
        <path d="M42 269H310M28 278H323M10 288H342" stroke="#d88860" strokeWidth="3" />
        <path d="M399 278H583" stroke="#edb976" strokeWidth="2" />
      </>}
      {city === "berkeley" && <>
        <circle cx="114" cy="79" r="42" fill="#f7e6ab" />
        <path d="M0 179Q94 133 178 166T364 152T600 153V300H0Z" fill="#91b1ad" />
        <path d="M0 191H600V300H0Z" fill="#6f9d9f" />
        <g fill="#64858b"><path d="M32 184V168H45V184M52 184V159H65V184M72 184V143L79 131L86 143V184M93 184V163H111V184M119 184V155H136V184" /></g>
        <g stroke="#b8684c" strokeWidth="3">
          <path d="M0 207H282M53 217V169M203 217V169M53 173Q128 224 203 173M0 201Q29 193 53 173M203 173Q239 198 282 203" />
          <path d="M79 189V207M104 198V207M129 201V207M154 198V207M179 189V207" strokeWidth="1.5" />
        </g>
        <path d="M0 265Q134 225 267 241Q409 183 600 217V300H0Z" fill="#54765c" />
        <g fill="#315846">
          <path d="M466 272V167H472V272M491 272V152H497V272M522 272V176H528V272" />
          <ellipse cx="468" cy="172" rx="24" ry="42" /><ellipse cx="494" cy="157" rx="22" ry="48" /><ellipse cx="525" cy="181" rx="24" ry="40" />
        </g>
        <path d="M310 282V246H445V282" fill="#dfcda2" />
        <path d="M296 249L377 226L457 249Z" fill="#aa7752" />
        <g stroke="#8c957f" strokeWidth="6"><path d="M324 258V282M344 258V282M366 258V282M389 258V282M413 258V282M433 258V282" /></g>
        <path d="M354 257V95H387V257Z" fill="#f3e2b6" />
        <path d="M377 95H387V257H377Z" fill="#d4bf92" />
        <path d="M351 96L371 59L391 96Z" fill="#345563" />
        <path d="M371 59V46" stroke="#345563" strokeWidth="2" />
        <path d="M351 118H391M351 135H391" stroke="#ac9f7d" strokeWidth="3" />
        <path d="M360 115V103M370 115V103M380 115V103" stroke="#345563" strokeWidth="4" />
        <circle cx="369" cy="147" r="7" fill="#fcf3d6" stroke="#8b937c" />
        <path d="M369 143V147L373 149M368 166V238" stroke="#8b937c" strokeWidth="2" />
        <path d="M0 290Q205 264 350 289T600 275V300H0Z" fill="#254d43" />
        <path d="M369 300L381 283H401L423 300" fill="#d3bb85" />
      </>}
      {city === "new-york" && <>
        <circle cx="470" cy="59" r="32" fill="#dfc3ed" />
        <g fill="#57617e"><path d="M0 286V151H37V286M47 286V112H77V286M86 286V143H123V286M142 286V96H178V286M191 286V151H232V286M403 286V131H440V286M455 286V174H491V286M503 286V121H543V286M551 286V158H600V286" /></g>
        <g fill="#9290ab"><path d="M253 284V155L273 70L293 155V284Z" /><path d="M273 70V39" stroke="#9290ab" strokeWidth="2" /></g>
        <g fill="#151e35">
          <path d="M0 300V213H57V300M67 300V164H119V300M129 300V210H164V300M173 300V136H215V300M227 300V228H277V300M292 300V175H329V300M415 300V203H465V300M477 300V154H527V300M539 300V221H600V300" />
          <path d="M343 300V141H351V117H362V96H370V71H376V96H385V117H396V141H405V300Z" />
          <path d="M373 71V39" stroke="#f0c883" strokeWidth="2" />
        </g>
        {[14, 80, 94, 184, 199, 239, 305, 356, 373, 389, 429, 446, 489, 511, 552, 577].map((x, i) => <g key={x} fill={["#efd080", "#b5b9dd", "#d78e73"][i % 3]}>
          {Array.from({ length: 5 }, (_, row) => <rect key={row} x={x} y={224 + row * 14 - (i > 6 && i < 10 ? 58 : 0)} width="4" height="6" opacity={(i + row) % 3 === 0 ? .25 : .85} />)}
        </g>)}
        <path d="M0 295H600" stroke="#ab91b3" strokeWidth="2" />
        <path d="M86 291H113V298H86Z" fill="#efc55e" />
        <path d="M91 291L95 287H105L109 291" fill="#efc55e" />
        <path d="M231 298H281M459 298H488" stroke="#efc55e" strokeWidth="2" />
      </>}
    </svg>
  );
}

export default function CitiesPage() {
  return (
    <section aria-labelledby="cities-heading" className="mx-auto w-full max-w-7xl px-6 pb-16 pt-12 sm:px-10 sm:pb-24 sm:pt-16 lg:px-12" style={{ color: "#2c352d" }}>
      <div className="mb-9 flex flex-col justify-between gap-5 border-b border-current/20 pb-7 sm:mb-12 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em]">A personal geography / 01—04</p>
          <h2 id="cities-heading" className="font-display text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">Four cities.<br />Four ways of seeing.</h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed sm:pb-1">From an oasis in Xinjiang to the streets of New York. The places that shaped my world.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 sm:gap-7">
        {cities.map((city, index) => (
          <article key={city.id} aria-labelledby={`${city.id}-heading`} className="flex min-w-0 flex-col overflow-hidden rounded-sm" style={{ backgroundColor: city.background, color: city.foreground }}>
            <div className="px-6 pt-6 sm:px-8 sm:pt-7">
              <div className="mb-7 flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px]">
                <span>{String(index + 1).padStart(2, "0")} / {city.region}</span>
                <span className="shrink-0 border border-current/30 px-2 py-1 tracking-wide">{city.date}</span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h3 id={`${city.id}-heading`} className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{city.name}</h3>
                <span lang="zh" className="text-lg tracking-[0.18em] opacity-75">{city.native}</span>
              </div>
            </div>
            <div className="mt-3"><Cityscape city={city.id} /></div>
            <div className="flex flex-1 flex-col px-6 pb-6 pt-6 sm:px-8 sm:pb-7">
              <h4 className="text-lg font-semibold leading-snug">{city.title}</h4>
              <p className="mb-6 mt-3 max-w-md text-sm leading-relaxed" style={{ color: city.accent }}>{city.description}</p>
              <p className="mt-auto border-t border-current/20 pt-4 text-[9px] font-medium uppercase leading-relaxed tracking-[0.13em] sm:text-[10px]">{city.details}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between gap-4 text-[10px] font-medium uppercase tracking-[0.16em] sm:text-xs">
        <span>China → Across the Pacific → USA</span>
        <span className="shrink-0">Still becoming.</span>
      </div>
    </section>
  );
}
