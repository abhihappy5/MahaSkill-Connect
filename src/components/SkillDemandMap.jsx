import React, { useState } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  Building2, 
  ChevronRight, 
  Briefcase, 
  Layers, 
  Compass,
  CheckCircle2,
  Info
} from 'lucide-react';
import { divisionsData, districtTranslations } from '../data/districtsData';

export function SkillDemandMap({ t, lang }) {
  const [selectedDivisionId, setSelectedDivisionId] = useState("pune");
  const [hoveredDivisionId, setHoveredDivisionId] = useState(null);

  const currentDivision = divisionsData.find(d => d.id === selectedDivisionId) || divisionsData[0];

  const getDistrictName = (dName) => {
    if (districtTranslations[dName]) {
      return lang === 'mr' ? districtTranslations[dName].mr : (lang === 'hi' ? districtTranslations[dName].hi : districtTranslations[dName].en);
    }
    return dName;
  };

  return (
    <section id="skill-demand" className="skill-demand-section" aria-label="Maharashtra Skill Demand">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <TrendingUp size={14} />
            {t.skillDemandTag || 'Live Labour Market Intelligence'}
          </span>
          <h2 className="section-title">{t.skillDemandTitle || 'Statewide Skill Demand & Regional Division Map'}</h2>
          <p className="section-subtitle">{t.skillDemandSubtitle || 'Official 6 Administrative Divisions & 36 Constituent Districts of Maharashtra with live interactive demand analysis.'}</p>
        </div>

        {/* Top Interactive Map & Intelligence Panel Grid */}
        <div className="map-intelligence-layout">
          {/* Left Column: Official Administrative Divisions Interactive Ultra-HD Vector Map */}
          <div className="division-tabs-col">
            <div className="interactive-map-card" style={{ background: '#ffffff', padding: '16px', border: '1.5px solid var(--border-subtle)', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--navy-deep)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={14} style={{ color: 'var(--saffron-primary)' }} />
                  {t.mapInteractiveTitle || 'Interactive Maharashtra Map (6 Divisions)'}
                </span>
                <span className="badge badge-saffron" style={{ fontSize: '0.72rem', padding: '3px 9px' }}>
                  {t.mapClickHint || 'Click any division on map'}
                </span>
              </div>

              {/* Ultra-HD Official Maharashtra Map with 100% Precise Region Highlight */}
              <div 
                className="map-image-overlay-container" 
                style={{ 
                  position: 'relative', 
                  width: '100%',
                  background: '#ffffff', 
                  borderRadius: 'var(--radius-md)', 
                  overflow: 'hidden',
                  border: '1.5px solid #cbd5e1',
                  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)'
                }}
              >
                {/* 1. Underlying HD State Map Image */}
                <img 
                  src="/maharashtra_map.png" 
                  alt="Maharashtra Administrative Revenue Divisions Map" 
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                />

                {/* 2. Interactive SVG Precision Overlay */}
                <svg 
                  viewBox="0 0 1024 808" 
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%', 
                    height: '100%', 
                    display: 'block',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                    pointerEvents: 'auto'
                  }}
                >
                  <defs>
                    {/* Shadow Glow for Selected Region */}
                    <filter id="divisionGlow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ea580c" floodOpacity="0.95" />
                    </filter>
                    <filter id="hoverShadow" x="-5%" y="-5%" width="110%" height="110%">
                      <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#ea580c" floodOpacity="0.75" />
                    </filter>
                  </defs>

                  {/* 1. KONKAN DIVISION */}
                  <path 
                    d="M 142 242 L 150 256 L 170 258 L 192 268 L 188 282 L 198 292 L 196 298 L 212 312 L 212 318 L 228 336 L 228 342 L 222 340 L 214 354 L 192 364 L 198 368 L 198 374 L 182 392 L 184 398 L 178 406 L 182 416 L 178 424 L 188 440 L 190 452 L 210 470 L 208 480 L 214 488 L 200 502 L 204 504 L 202 520 L 212 524 L 220 538 L 220 556 L 214 560 L 214 570 L 218 574 L 216 580 L 226 584 L 224 588 L 232 598 L 232 604 L 224 614 L 224 626 L 232 630 L 232 638 L 214 648 L 212 662 L 222 668 L 234 668 L 236 686 L 244 690 L 244 694 L 234 696 L 230 704 L 234 708 L 238 704 L 248 704 L 256 712 L 254 722 L 262 736 L 258 748 L 252 752 L 246 750 L 244 738 L 236 732 L 220 738 L 216 724 L 206 718 L 202 700 L 188 690 L 196 680 L 186 656 L 190 652 L 186 646 L 188 636 L 182 614 L 184 592 L 176 578 L 176 562 L 168 556 L 170 534 L 164 530 L 166 520 L 162 516 L 162 504 L 154 494 L 156 486 L 150 478 L 150 464 L 142 454 L 144 424 L 136 412 L 140 400 L 154 400 L 146 388 L 160 376 L 152 374 L 152 360 L 148 358 L 144 362 L 144 374 L 136 374 L 132 384 L 132 354 L 110 338 L 110 334 L 124 346 L 138 340 L 128 336 L 126 322 L 122 320 L 124 306 L 122 298 L 116 296 L 116 284 L 122 270 L 124 248 L 136 248 L 140 244 Z"
                    fill={selectedDivisionId === 'konkan' ? 'rgba(234, 88, 12, 0.22)' : (hoveredDivisionId === 'konkan' ? 'rgba(234, 88, 12, 0.12)' : 'transparent')}
                    stroke={selectedDivisionId === 'konkan' ? '#ea580c' : (hoveredDivisionId === 'konkan' ? '#ea580c' : 'transparent')}
                    strokeWidth={selectedDivisionId === 'konkan' ? 4.5 : (hoveredDivisionId === 'konkan' ? 3 : 0)}
                    strokeLinejoin="round"
                    filter={selectedDivisionId === 'konkan' ? 'url(#divisionGlow)' : (hoveredDivisionId === 'konkan' ? 'url(#hoverShadow)' : 'none')}
                    style={{ cursor: 'pointer', transition: 'fill 0.2s ease, stroke 0.2s ease' }}
                    onClick={() => setSelectedDivisionId('konkan')}
                    onMouseEnter={() => setHoveredDivisionId('konkan')}
                    onMouseLeave={() => setHoveredDivisionId(null)}
                  >
                    <title>{lang === 'mr' ? 'कोकण विभाग (७ जिल्हे)' : (lang === 'hi' ? 'कोंकण संभाग (७ जिले)' : 'Konkan Division (7 Districts)')}</title>
                  </path>

                  {/* 2. NASHIK DIVISION */}
                  <path 
                    d="M 302 42 L 312 46 L 316 56 L 316 62 L 312 64 L 314 74 L 304 84 L 306 86 L 322 80 L 326 86 L 342 88 L 346 92 L 354 86 L 358 90 L 368 90 L 388 114 L 420 114 L 426 120 L 432 114 L 448 120 L 466 114 L 472 120 L 480 118 L 482 122 L 488 122 L 488 132 L 494 134 L 490 142 L 494 152 L 500 156 L 516 152 L 518 158 L 512 162 L 500 156 L 488 164 L 476 186 L 476 200 L 470 206 L 456 208 L 438 200 L 420 212 L 398 208 L 382 222 L 374 236 L 368 236 L 360 244 L 350 238 L 346 240 L 338 252 L 338 262 L 328 288 L 322 290 L 344 308 L 382 316 L 390 324 L 402 326 L 420 338 L 418 348 L 410 356 L 410 368 L 378 374 L 374 366 L 358 366 L 358 380 L 348 380 L 346 388 L 378 418 L 408 404 L 412 404 L 418 414 L 422 412 L 424 418 L 414 428 L 378 436 L 374 444 L 352 454 L 338 448 L 332 440 L 322 440 L 316 424 L 308 420 L 308 414 L 274 376 L 274 368 L 288 356 L 268 356 L 260 352 L 252 340 L 230 336 L 192 284 L 192 266 L 172 254 L 178 248 L 188 248 L 196 238 L 196 216 L 204 208 L 200 204 L 200 194 L 216 194 L 214 198 L 220 198 L 228 206 L 240 200 L 244 186 L 248 188 L 258 180 L 252 172 L 252 156 L 242 152 L 228 138 L 240 134 L 260 114 L 264 104 L 282 104 L 294 96 L 292 92 L 270 90 L 250 100 L 244 98 L 240 88 L 252 78 L 246 58 L 252 60 L 270 50 L 290 52 L 300 44 Z"
                    fill={selectedDivisionId === 'nashik' ? 'rgba(234, 88, 12, 0.22)' : (hoveredDivisionId === 'nashik' ? 'rgba(234, 88, 12, 0.12)' : 'transparent')}
                    stroke={selectedDivisionId === 'nashik' ? '#ea580c' : (hoveredDivisionId === 'nashik' ? '#ea580c' : 'transparent')}
                    strokeWidth={selectedDivisionId === 'nashik' ? 4.5 : (hoveredDivisionId === 'nashik' ? 3 : 0)}
                    strokeLinejoin="round"
                    filter={selectedDivisionId === 'nashik' ? 'url(#divisionGlow)' : (hoveredDivisionId === 'nashik' ? 'url(#hoverShadow)' : 'none')}
                    style={{ cursor: 'pointer', transition: 'fill 0.2s ease, stroke 0.2s ease' }}
                    onClick={() => setSelectedDivisionId('nashik')}
                    onMouseEnter={() => setHoveredDivisionId('nashik')}
                    onMouseLeave={() => setHoveredDivisionId(null)}
                  >
                    <title>{lang === 'mr' ? 'नाशिक विभाग (५ जिल्हे)' : (lang === 'hi' ? 'नासिक संभाग (५ जिले)' : 'Nashik Division (5 Districts)')}</title>
                  </path>

                  {/* 3. PUNE DIVISION */}
                  <path 
                    d="M 232 338 L 250 340 L 264 356 L 282 358 L 274 366 L 272 376 L 306 414 L 306 420 L 314 424 L 320 442 L 326 446 L 332 440 L 344 456 L 374 446 L 382 436 L 392 434 L 396 436 L 394 444 L 408 460 L 410 470 L 422 474 L 446 452 L 446 448 L 460 456 L 480 448 L 470 462 L 472 470 L 468 480 L 474 488 L 472 492 L 460 488 L 456 500 L 464 512 L 474 510 L 476 518 L 486 516 L 496 528 L 508 524 L 522 534 L 514 542 L 512 558 L 518 564 L 516 570 L 490 566 L 476 572 L 460 562 L 442 562 L 436 554 L 426 570 L 436 582 L 440 600 L 436 610 L 432 606 L 426 612 L 398 610 L 388 622 L 382 622 L 370 612 L 356 612 L 348 632 L 322 634 L 318 642 L 322 650 L 302 642 L 294 654 L 284 648 L 280 650 L 276 654 L 286 664 L 280 680 L 298 686 L 302 692 L 300 700 L 294 700 L 288 706 L 290 710 L 298 708 L 298 714 L 284 738 L 272 732 L 266 736 L 260 734 L 258 712 L 248 702 L 232 702 L 246 692 L 238 684 L 236 668 L 222 666 L 214 658 L 216 648 L 232 640 L 234 630 L 224 622 L 234 598 L 226 588 L 228 584 L 218 580 L 220 574 L 214 564 L 222 554 L 220 534 L 204 516 L 204 502 L 214 490 L 210 480 L 212 470 L 190 450 L 192 446 L 180 424 L 184 416 L 184 392 L 194 384 L 202 362 L 216 354 L 222 342 L 232 340 Z"
                    fill={selectedDivisionId === 'pune' ? 'rgba(234, 88, 12, 0.22)' : (hoveredDivisionId === 'pune' ? 'rgba(234, 88, 12, 0.12)' : 'transparent')}
                    stroke={selectedDivisionId === 'pune' ? '#ea580c' : (hoveredDivisionId === 'pune' ? '#ea580c' : 'transparent')}
                    strokeWidth={selectedDivisionId === 'pune' ? 4.5 : (hoveredDivisionId === 'pune' ? 3 : 0)}
                    strokeLinejoin="round"
                    filter={selectedDivisionId === 'pune' ? 'url(#divisionGlow)' : (hoveredDivisionId === 'pune' ? 'url(#hoverShadow)' : 'none')}
                    style={{ cursor: 'pointer', transition: 'fill 0.2s ease, stroke 0.2s ease' }}
                    onClick={() => setSelectedDivisionId('pune')}
                    onMouseEnter={() => setHoveredDivisionId('pune')}
                    onMouseLeave={() => setHoveredDivisionId(null)}
                  >
                    <title>{lang === 'mr' ? 'पुणे विभाग (५ जिल्हे)' : (lang === 'hi' ? 'पुणे संभाग (५ जिले)' : 'Pune Division (5 Districts)')}</title>
                  </path>

                  {/* 4. AURANGABAD / MARATHWADA DIVISION */}
                  <path 
                    d="M 438 202 L 454 210 L 468 210 L 476 202 L 480 204 L 472 216 L 468 236 L 472 240 L 488 236 L 494 242 L 492 252 L 478 272 L 496 290 L 526 280 L 540 288 L 550 288 L 574 272 L 594 270 L 604 278 L 622 278 L 644 304 L 660 310 L 672 326 L 666 332 L 668 336 L 676 336 L 686 324 L 694 330 L 710 328 L 720 316 L 716 308 L 684 300 L 682 292 L 690 284 L 722 282 L 736 292 L 734 300 L 728 304 L 728 330 L 716 336 L 716 352 L 702 354 L 698 346 L 682 348 L 680 370 L 668 378 L 668 384 L 678 388 L 692 402 L 680 404 L 676 414 L 666 420 L 666 432 L 658 430 L 654 434 L 646 450 L 650 458 L 644 458 L 638 464 L 636 456 L 628 458 L 626 444 L 614 448 L 608 456 L 608 466 L 596 476 L 582 472 L 576 478 L 582 488 L 576 494 L 576 502 L 568 506 L 572 512 L 556 518 L 552 530 L 538 518 L 528 532 L 522 532 L 512 524 L 494 526 L 490 516 L 478 518 L 474 508 L 464 508 L 458 502 L 460 492 L 470 494 L 474 490 L 470 464 L 482 450 L 480 446 L 468 454 L 458 454 L 446 444 L 444 452 L 422 472 L 410 468 L 410 460 L 396 444 L 396 436 L 414 430 L 430 412 L 418 412 L 410 400 L 380 416 L 346 386 L 348 382 L 360 382 L 356 372 L 360 366 L 372 366 L 376 374 L 398 382 L 402 378 L 398 370 L 412 370 L 416 366 L 412 364 L 412 356 L 424 340 L 380 314 L 344 306 L 328 288 L 346 244 L 352 244 L 358 250 L 368 238 L 380 234 L 394 212 L 404 208 L 412 214 L 420 214 L 436 204 Z"
                    fill={selectedDivisionId === 'marathwada' ? 'rgba(234, 88, 12, 0.22)' : (hoveredDivisionId === 'marathwada' ? 'rgba(234, 88, 12, 0.12)' : 'transparent')}
                    stroke={selectedDivisionId === 'marathwada' ? '#ea580c' : (hoveredDivisionId === 'marathwada' ? '#ea580c' : 'transparent')}
                    strokeWidth={selectedDivisionId === 'marathwada' ? 4.5 : (hoveredDivisionId === 'marathwada' ? 3 : 0)}
                    strokeLinejoin="round"
                    filter={selectedDivisionId === 'marathwada' ? 'url(#divisionGlow)' : (hoveredDivisionId === 'marathwada' ? 'url(#hoverShadow)' : 'none')}
                    style={{ cursor: 'pointer', transition: 'fill 0.2s ease, stroke 0.2s ease' }}
                    onClick={() => setSelectedDivisionId('marathwada')}
                    onMouseEnter={() => setHoveredDivisionId('marathwada')}
                    onMouseLeave={() => setHoveredDivisionId(null)}
                  >
                    <title>{lang === 'mr' ? 'छत्रपती संभाजीनगर विभाग (८ जिल्हे)' : (lang === 'hi' ? 'छत्रपति संभाजीनगर संभाग (८ जिले)' : 'Aurangabad / Marathwada Division (8 Districts)')}</title>
                  </path>

                  {/* 5. AMRAVATI DIVISION */}
                  <path 
                    d="M 618 76 L 640 76 L 646 82 L 652 100 L 634 100 L 642 118 L 658 116 L 668 120 L 676 114 L 694 116 L 714 104 L 716 98 L 736 92 L 740 92 L 744 106 L 752 102 L 760 104 L 750 104 L 740 118 L 732 118 L 728 124 L 708 120 L 704 124 L 704 134 L 716 166 L 728 180 L 728 206 L 766 222 L 776 236 L 788 236 L 816 262 L 818 278 L 824 286 L 792 304 L 796 308 L 800 306 L 806 318 L 814 318 L 830 328 L 810 318 L 802 320 L 802 310 L 794 308 L 788 296 L 748 292 L 734 282 L 690 282 L 682 290 L 682 298 L 688 304 L 706 310 L 714 308 L 718 310 L 718 316 L 708 328 L 684 324 L 676 334 L 668 334 L 672 322 L 658 308 L 636 296 L 634 288 L 616 274 L 604 276 L 590 268 L 570 272 L 558 284 L 544 288 L 530 278 L 514 286 L 494 288 L 482 276 L 480 270 L 494 252 L 494 240 L 490 236 L 472 238 L 468 232 L 474 216 L 482 208 L 476 190 L 488 166 L 504 158 L 518 162 L 526 148 L 544 144 L 552 130 L 548 124 L 568 92 L 576 92 L 592 80 L 602 78 L 610 82 L 616 78 Z"
                    fill={selectedDivisionId === 'amravati' ? 'rgba(234, 88, 12, 0.22)' : (hoveredDivisionId === 'amravati' ? 'rgba(234, 88, 12, 0.12)' : 'transparent')}
                    stroke={selectedDivisionId === 'amravati' ? '#ea580c' : (hoveredDivisionId === 'amravati' ? '#ea580c' : 'transparent')}
                    strokeWidth={selectedDivisionId === 'amravati' ? 4.5 : (hoveredDivisionId === 'amravati' ? 3 : 0)}
                    strokeLinejoin="round"
                    filter={selectedDivisionId === 'amravati' ? 'url(#divisionGlow)' : (hoveredDivisionId === 'amravati' ? 'url(#hoverShadow)' : 'none')}
                    style={{ cursor: 'pointer', transition: 'fill 0.2s ease, stroke 0.2s ease' }}
                    onClick={() => setSelectedDivisionId('amravati')}
                    onMouseEnter={() => setHoveredDivisionId('amravati')}
                    onMouseLeave={() => setHoveredDivisionId(null)}
                  >
                    <title>{lang === 'mr' ? 'अमरावती विभाग (५ जिल्हे)' : (lang === 'hi' ? 'अमरावती संभाग (५ जिले)' : 'Amravati Division (5 Districts)')}</title>
                  </path>

                  {/* 6. NAGPUR DIVISION */}
                  <path 
                    d="M 832 80 L 840 84 L 858 84 L 862 100 L 886 90 L 898 98 L 910 100 L 940 84 L 964 110 L 978 118 L 976 122 L 968 116 L 938 122 L 940 128 L 950 124 L 960 130 L 964 124 L 966 128 L 972 126 L 976 130 L 974 136 L 970 134 L 960 142 L 958 150 L 974 164 L 978 190 L 972 200 L 982 200 L 986 204 L 982 220 L 986 228 L 968 238 L 960 238 L 960 248 L 978 256 L 978 268 L 976 272 L 964 274 L 972 278 L 964 286 L 972 292 L 978 290 L 984 296 L 990 296 L 1002 326 L 1008 318 L 1012 324 L 1018 324 L 1006 330 L 1012 338 L 1004 346 L 986 334 L 972 342 L 956 364 L 952 388 L 958 398 L 948 412 L 938 414 L 916 402 L 918 394 L 908 370 L 916 362 L 914 354 L 918 336 L 910 320 L 904 320 L 896 312 L 886 312 L 874 322 L 868 318 L 860 322 L 858 318 L 852 320 L 836 310 L 832 314 L 834 322 L 828 326 L 806 316 L 804 308 L 794 306 L 794 302 L 826 286 L 818 276 L 816 260 L 788 236 L 776 234 L 768 222 L 740 212 L 728 202 L 730 180 L 714 160 L 714 148 L 704 126 L 708 122 L 728 124 L 738 120 L 752 104 L 784 108 L 792 102 L 798 106 L 798 96 L 802 92 L 822 90 L 830 82 Z"
                    fill={selectedDivisionId === 'nagpur' ? 'rgba(234, 88, 12, 0.22)' : (hoveredDivisionId === 'nagpur' ? 'rgba(234, 88, 12, 0.12)' : 'transparent')}
                    stroke={selectedDivisionId === 'nagpur' ? '#ea580c' : (hoveredDivisionId === 'nagpur' ? '#ea580c' : 'transparent')}
                    strokeWidth={selectedDivisionId === 'nagpur' ? 4.5 : (hoveredDivisionId === 'nagpur' ? 3 : 0)}
                    strokeLinejoin="round"
                    filter={selectedDivisionId === 'nagpur' ? 'url(#divisionGlow)' : (hoveredDivisionId === 'nagpur' ? 'url(#hoverShadow)' : 'none')}
                    style={{ cursor: 'pointer', transition: 'fill 0.2s ease, stroke 0.2s ease' }}
                    onClick={() => setSelectedDivisionId('nagpur')}
                    onMouseEnter={() => setHoveredDivisionId('nagpur')}
                    onMouseLeave={() => setHoveredDivisionId(null)}
                  >
                    <title>{lang === 'mr' ? 'नागपूर विभाग (६ जिल्हे)' : (lang === 'hi' ? 'नागपुर संभाग (६ जिले)' : 'Nagpur Division (6 Districts)')}</title>
                  </path>

                  {/* =========================================================================
                      INTERACTIVE LEGEND OVERLAY HOTSPOTS (Bottom Right of Map Image)
                      ========================================================================= */}
                  {/* Amravati Legend Hotspot */}
                  <rect 
                    x="695" y="498" width="295" height="38" rx="6"
                    fill={selectedDivisionId === 'amravati' ? 'rgba(234, 88, 12, 0.18)' : (hoveredDivisionId === 'amravati' ? 'rgba(234, 88, 12, 0.08)' : 'transparent')}
                    stroke={selectedDivisionId === 'amravati' ? '#ea580c' : 'transparent'}
                    strokeWidth={selectedDivisionId === 'amravati' ? 2 : 0}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedDivisionId('amravati')}
                    onMouseEnter={() => setHoveredDivisionId('amravati')}
                    onMouseLeave={() => setHoveredDivisionId(null)}
                  />

                  {/* Aurangabad Legend Hotspot */}
                  <rect 
                    x="695" y="538" width="295" height="38" rx="6"
                    fill={selectedDivisionId === 'marathwada' ? 'rgba(234, 88, 12, 0.18)' : (hoveredDivisionId === 'marathwada' ? 'rgba(234, 88, 12, 0.08)' : 'transparent')}
                    stroke={selectedDivisionId === 'marathwada' ? '#ea580c' : 'transparent'}
                    strokeWidth={selectedDivisionId === 'marathwada' ? 2 : 0}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedDivisionId('marathwada')}
                    onMouseEnter={() => setHoveredDivisionId('marathwada')}
                    onMouseLeave={() => setHoveredDivisionId(null)}
                  />

                  {/* Konkan Legend Hotspot */}
                  <rect 
                    x="695" y="578" width="295" height="38" rx="6"
                    fill={selectedDivisionId === 'konkan' ? 'rgba(234, 88, 12, 0.18)' : (hoveredDivisionId === 'konkan' ? 'rgba(234, 88, 12, 0.08)' : 'transparent')}
                    stroke={selectedDivisionId === 'konkan' ? '#ea580c' : 'transparent'}
                    strokeWidth={selectedDivisionId === 'konkan' ? 2 : 0}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedDivisionId('konkan')}
                    onMouseEnter={() => setHoveredDivisionId('konkan')}
                    onMouseLeave={() => setHoveredDivisionId(null)}
                  />

                  {/* Nagpur Legend Hotspot */}
                  <rect 
                    x="695" y="618" width="295" height="38" rx="6"
                    fill={selectedDivisionId === 'nagpur' ? 'rgba(234, 88, 12, 0.18)' : (hoveredDivisionId === 'nagpur' ? 'rgba(234, 88, 12, 0.08)' : 'transparent')}
                    stroke={selectedDivisionId === 'nagpur' ? '#ea580c' : 'transparent'}
                    strokeWidth={selectedDivisionId === 'nagpur' ? 2 : 0}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedDivisionId('nagpur')}
                    onMouseEnter={() => setHoveredDivisionId('nagpur')}
                    onMouseLeave={() => setHoveredDivisionId(null)}
                  />

                  {/* Nashik Legend Hotspot */}
                  <rect 
                    x="695" y="658" width="295" height="38" rx="6"
                    fill={selectedDivisionId === 'nashik' ? 'rgba(234, 88, 12, 0.18)' : (hoveredDivisionId === 'nashik' ? 'rgba(234, 88, 12, 0.08)' : 'transparent')}
                    stroke={selectedDivisionId === 'nashik' ? '#ea580c' : 'transparent'}
                    strokeWidth={selectedDivisionId === 'nashik' ? 2 : 0}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedDivisionId('nashik')}
                    onMouseEnter={() => setHoveredDivisionId('nashik')}
                    onMouseLeave={() => setHoveredDivisionId(null)}
                  />

                  {/* Pune Legend Hotspot */}
                  <rect 
                    x="695" y="698" width="295" height="38" rx="6"
                    fill={selectedDivisionId === 'pune' ? 'rgba(234, 88, 12, 0.18)' : (hoveredDivisionId === 'pune' ? 'rgba(234, 88, 12, 0.08)' : 'transparent')}
                    stroke={selectedDivisionId === 'pune' ? '#ea580c' : 'transparent'}
                    strokeWidth={selectedDivisionId === 'pune' ? 2 : 0}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedDivisionId('pune')}
                    onMouseEnter={() => setHoveredDivisionId('pune')}
                    onMouseLeave={() => setHoveredDivisionId(null)}
                  />
                </svg>
              </div>

              {/* Active Division Indicator Bar */}
              <div style={{ marginTop: '12px', fontSize: '0.82rem', color: 'var(--navy-deep)', background: '#f8fafc', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--saffron-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span style={{ color: 'var(--saffron-primary)', fontWeight: 800 }}>{t.mapActiveDivision || 'ACTIVE DIVISION:'} </span>
                  <strong>{lang === 'mr' ? currentDivision.nameMr : (lang === 'hi' ? currentDivision.nameHi : currentDivision.name)}</strong> ({currentDivision.districtsCount} {t.mapDistricts || 'Districts'})
                </div>
                <span className="badge badge-green">
                  {t.mapLiveOpenings || 'Live Openings:'} {currentDivision.vacancies}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Regional Intelligence Panel */}
          <div className="intelligence-panel">
            <div className="panel-top-row">
              <div>
                <h3 className="panel-title">
                  {lang === 'mr' ? currentDivision.nameMr : (lang === 'hi' ? currentDivision.nameHi : currentDivision.name)}
                </h3>
                <p className="panel-summary">
                  {lang === 'mr' ? currentDivision.summaryMr : (lang === 'hi' ? currentDivision.summaryHi : currentDivision.summary)}
                </p>
              </div>
              <span className="badge badge-green">
                {t.mapLiveData || 'Live Data'}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="panel-stats-grid">
              <div className="panel-stat-box">
                <div className="panel-stat-val">{currentDivision.vacancies}</div>
                <div className="panel-stat-lbl">{t.mapOpenVacancies || 'Open Vacancies'}</div>
              </div>
              <div className="panel-stat-box">
                <div className="panel-stat-val" style={{ color: 'var(--navy-accent)' }}>{currentDivision.trainingCenters}</div>
                <div className="panel-stat-lbl">{t.mapTrainingCenters || 'Govt ITIs & Poly'}</div>
              </div>
              <div className="panel-stat-box">
                <div className="panel-stat-val" style={{ color: '#dc2626' }}>
                  {lang === 'mr' ? currentDivision.shortageIndexMr : (lang === 'hi' ? currentDivision.shortageIndexHi : currentDivision.shortageIndex)}
                </div>
                <div className="panel-stat-lbl">{t.mapDemandGap || 'Demand Gap'}</div>
              </div>
            </div>

            {/* High-Demand Occupations */}
            <div style={{ marginBottom: '18px' }}>
              <div className="intel-section-title">
                <Briefcase size={16} style={{ color: 'var(--saffron-primary)' }} />
                {t.mapHighDemand || 'High-Demand Roles & Packages'}
              </div>
              <div className="demand-occupations-list">
                {currentDivision.topOccupations.map((occ, idx) => (
                  <div key={idx} className="demand-occ-item">
                    <span className="occ-role-name">
                      {lang === 'mr' ? occ.roleMr : (lang === 'hi' ? occ.roleHi : occ.role)}
                    </span>
                    <div className="occ-meta">
                      <span className="badge badge-saffron">
                        {lang === 'mr' ? occ.demandMr : (lang === 'hi' ? occ.demandHi : occ.demand)}
                      </span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)' }}>{occ.salary}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Shortages Alert */}
            <div style={{ marginBottom: '18px' }}>
              <div className="intel-section-title">
                <AlertTriangle size={16} style={{ color: '#dc2626' }} />
                {t.mapSkillShortages || 'Critical Skill Shortages'}
              </div>
              <div className="shortage-pills-row">
                {(lang === 'mr' && currentDivision.skillShortagesMr ? currentDivision.skillShortagesMr : (lang === 'hi' && currentDivision.skillShortagesHi ? currentDivision.skillShortagesHi : currentDivision.skillShortages)).map((shortage, idx) => (
                  <span key={idx} className="shortage-pill">
                    {shortage}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Industrial Corridors */}
            <div>
              <div className="intel-section-title">
                <Building2 size={16} style={{ color: 'var(--navy-accent)' }} />
                {t.mapIndustrialCorridor || 'Key Industrial Corridors & SEZs'}
              </div>
              <div className="corridor-pills-row">
                {(lang === 'mr' && currentDivision.industrialCorridorsMr ? currentDivision.industrialCorridorsMr : (lang === 'hi' && currentDivision.industrialCorridorsHi ? currentDivision.industrialCorridorsHi : currentDivision.industrialCorridors)).map((corridor, idx) => (
                  <span key={idx} className="corridor-pill">
                    {corridor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EXPLICIT 6 DIVISIONS & 36 CONSTITUENT DISTRICTS DIRECTORY
            ========================================================================= */}
        <div style={{ marginTop: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-navy">{t.mapDirTag || 'Official Administration'}</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                  {t.mapDirTitle || 'Maharashtra 6 Revenue Divisions & Constituent 36 Districts Directory'}
                </h3>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {t.mapDirSubtitle || 'Each division contains its official constituent districts. Click on any division card below to highlight it on the map and view live intelligence.'}
              </p>
            </div>
          </div>

          {/* 6 Division Cards Grid matching exact image colors */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
            {divisionsData.map((div) => {
              const isSelected = selectedDivisionId === div.id;
              return (
                <div
                  key={div.id}
                  onClick={() => {
                    setSelectedDivisionId(div.id);
                    const mapEl = document.getElementById('skill-demand');
                    if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    background: isSelected ? div.lightColor : '#ffffff',
                    border: isSelected ? `2.5px solid ${div.color}` : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px 18px',
                    boxShadow: isSelected ? '0 8px 24px rgba(15, 23, 42, 0.12)' : 'var(--shadow-xs)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  {/* Division Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '3px', background: div.color, display: 'inline-block', border: '1px solid rgba(0,0,0,0.15)' }}></span>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                          {lang === 'mr' ? div.nameMr : (lang === 'hi' ? div.nameHi : div.name)}
                        </h4>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 600 }}>
                        {t.mapHQ || 'HQ'}: {lang === 'mr' ? div.headquartersMr : (lang === 'hi' ? div.headquartersHi : div.headquarters)} • {div.vacancies} {t.mapLiveVacancies || 'Live Vacancies'}
                      </div>
                    </div>

                    <span 
                      style={{ 
                        fontSize: '0.72rem', 
                        fontWeight: 800, 
                        background: isSelected ? div.color : '#f1f5f9', 
                        color: isSelected ? '#ffffff' : 'var(--navy-deep)', 
                        padding: '3px 8px', 
                        borderRadius: 'var(--radius-full)' 
                      }}
                    >
                      {div.districtsCount} {t.mapDistricts || 'Districts'}
                    </span>
                  </div>

                  {/* Constituent Districts List */}
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--navy-accent)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.3px' }}>
                      {t.mapConstituentDistricts || 'Constituent Districts'} ({div.districtsCount}):
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {div.districts.map((districtName, dIdx) => (
                        <span
                          key={dIdx}
                          style={{
                            background: isSelected ? '#ffffff' : '#f8fafc',
                            border: `1px solid ${isSelected ? div.borderColor : 'var(--border-subtle)'}`,
                            color: 'var(--navy-deep)',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <MapPin size={10} style={{ color: div.color }} />
                          {getDistrictName(districtName)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Industrial Key Sectors */}
                  <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed var(--border-subtle)', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--navy-deep)' }}>{t.mapIndustrialFocus || 'Industrial Focus:'} </strong> 
                    {lang === 'mr' ? div.focusMr : (lang === 'hi' ? div.focusHi : div.focus)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
