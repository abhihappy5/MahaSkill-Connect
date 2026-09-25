import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  TrendingUp, 
  AlertTriangle, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles,
  FileText,
  ArrowRight
} from 'lucide-react';
import { adminDistrictIntelligence } from '../../data/adminDashboardData';

const hexToRgba = (hex, alpha) => {
  if (!hex || hex[0] !== '#') return hex;
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function AdminMapSection({ onGeneratePlanForDistrict, lang, t }) {
  const [activeColorMode, setActiveColorMode] = useState('demand'); // 'demand' | 'emerging' | 'shortage' | 'capacity'
  const [selectedDistrictKey, setSelectedDistrictKey] = useState('pune');
  const [hoveredDivisionId, setHoveredDivisionId] = useState(null);

  const currentDistrict = adminDistrictIntelligence[selectedDistrictKey] || adminDistrictIntelligence.pune;

  // Determine base color based on active color layer
  const getRegionColor = (distKey) => {
    const d = adminDistrictIntelligence[distKey];
    if (!d) return '#cbd5e1';

    if (activeColorMode === 'demand') {
      return d.demandStatus === 'high-demand' ? '#10b981' : (d.demandStatus === 'emerging' ? '#f59e0b' : '#ef4444');
    }
    if (activeColorMode === 'emerging') {
      return d.demandStatus === 'emerging' ? '#f59e0b' : '#94a3b8';
    }
    if (activeColorMode === 'shortage') {
      return d.gap < -500 ? '#dc2626' : (d.gap < -300 ? '#f87171' : '#fecaca');
    }
    if (activeColorMode === 'capacity') {
      return d.currentCapacity > 1000 ? '#2563eb' : (d.currentCapacity > 500 ? '#60a5fa' : '#93c5fd');
    }
    return '#10b981';
  };

  const isDivisionSelected = (divId) => {
    if (divId === 'konkan') return selectedDistrictKey === 'mumbai';
    if (divId === 'nashik') return selectedDistrictKey === 'nashik';
    if (divId === 'pune') return selectedDistrictKey === 'pune' || selectedDistrictKey === 'solapur';
    if (divId === 'marathwada' || divId === 'aurangabad') return selectedDistrictKey === 'aurangabad';
    if (divId === 'amravati') return selectedDistrictKey === 'amravati';
    if (divId === 'nagpur') return selectedDistrictKey === 'nagpur';
    return false;
  };

  const getDivisionFill = (divId, distKey) => {
    const isSelected = isDivisionSelected(divId);
    const isHovered = hoveredDivisionId === divId;
    const baseColor = getRegionColor(distKey);

    if (isSelected) {
      return hexToRgba(baseColor, 0.42);
    }
    if (isHovered) {
      return hexToRgba(baseColor, 0.26);
    }
    return hexToRgba(baseColor, 0.08);
  };

  const localizedDistrictName = lang === 'mr'
    ? (currentDistrict.nameMr || currentDistrict.name)
    : (lang === 'hi' ? (currentDistrict.nameHi || currentDistrict.name) : currentDistrict.name);

  return (
    <div className="admin-map-card" id="admin-sec-skill-demand" role="region" aria-label="Maharashtra Skill Demand Map">
      {/* Control Toolbar */}
      <div className="map-control-bar">
        <div>
          <span className="section-tag" style={{ background: 'var(--navy-subtle)', color: 'var(--navy-deep)', borderColor: 'var(--border-medium)' }}>
            <Layers size={13} />
            {t?.adminGeographicIntelTag || (lang === 'mr' ? 'राज्यव्यापी भौगोलिक बुद्धिमत्ता' : (lang === 'hi' ? 'राज्यव्यापी भौगोलिक खुफिया' : 'Statewide Geographic Intelligence'))}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '2px' }}>
            {t?.adminMapHeatmapTitle || (lang === 'mr' ? 'महाराष्ट्र कौशल्य मागणी व क्षमता हीटमॅप' : (lang === 'hi' ? 'महाराष्ट्र कौशल मांग और क्षमता हीटमैप' : 'Maharashtra Skill Demand & Capacity Heatmap'))}
          </h2>
        </div>

        {/* 4 Color Layer Toggles */}
        <div className="color-layer-btn-group" role="tablist" aria-label="Map Color Layers">
          <button
            type="button"
            className={`color-layer-btn ${activeColorMode === 'demand' ? 'active' : ''}`}
            onClick={() => setActiveColorMode('demand')}
          >
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
            {t?.adminLayerGreen || (lang === 'mr' ? 'हिरवा = उच्च मागणी' : (lang === 'hi' ? 'हरा = उच्च मांग' : 'Green = High Demand'))}
          </button>
          <button
            type="button"
            className={`color-layer-btn ${activeColorMode === 'emerging' ? 'active' : ''}`}
            onClick={() => setActiveColorMode('emerging')}
          >
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span>
            {t?.adminLayerOrange || (lang === 'mr' ? 'केशरी = उदयोन्मुख' : (lang === 'hi' ? 'नारंगी = उभरता हुआ' : 'Orange = Emerging'))}
          </button>
          <button
            type="button"
            className={`color-layer-btn ${activeColorMode === 'shortage' ? 'active' : ''}`}
            onClick={() => setActiveColorMode('shortage')}
          >
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#dc2626' }}></span>
            {t?.adminLayerRed || (lang === 'mr' ? 'लाल = कौशल्य कमतरता' : (lang === 'hi' ? 'लाल = कौशल कमी' : 'Red = Skill Shortage'))}
          </button>
          <button
            type="button"
            className={`color-layer-btn ${activeColorMode === 'capacity' ? 'active' : ''}`}
            onClick={() => setActiveColorMode('capacity')}
          >
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2563eb' }}></span>
            {t?.adminLayerBlue || (lang === 'mr' ? 'निळा = उच्च क्षमता' : (lang === 'hi' ? 'नीला = उच्च क्षमता' : 'Blue = High Capacity'))}
          </button>
        </div>
      </div>

      {/* Map & District Intelligence Side-by-Side */}
      <div className="map-and-intel-grid">
        {/* Modern Borderless HD Administrative Map */}
        <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '18px', textAlign: 'center', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-deep)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={13} style={{ color: 'var(--saffron-primary)' }} />
              {t?.adminClickCorridorHint || (lang === 'mr' ? 'कोणत्याही प्रादेशिक विभागावर क्लिक करा' : (lang === 'hi' ? 'किसी भी क्षेत्रीय संभाग पर क्लिक करें' : 'Click any regional division on map'))}
            </span>
            <span className="badge badge-navy">
              {lang === 'mr' 
                ? `सक्रिय स्तर: ${activeColorMode === 'demand' ? 'उच्च मागणी' : (activeColorMode === 'emerging' ? 'उदयोन्मुख' : (activeColorMode === 'shortage' ? 'कौशल्य कमतरता' : 'उच्च क्षमता'))}`
                : (lang === 'hi'
                  ? `सक्रिय स्तर: ${activeColorMode === 'demand' ? 'उच्च मांग' : (activeColorMode === 'emerging' ? 'उभरता हुआ' : (activeColorMode === 'shortage' ? 'कौशल कमी' : 'उच्च क्षमता'))}`
                  : `Active Layer: ${activeColorMode.toUpperCase()}`)}
            </span>
          </div>

          {/* Borderless Official HD Map Container with Interactive SVG Precision Overlay */}
          <div 
            className="map-image-overlay-container" 
            style={{ 
              position: 'relative', 
              width: '100%',
              background: '#ffffff', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden',
              border: 'none',
              boxShadow: 'none'
            }}
          >
            {/* 1. Underlying HD Official Administrative Map */}
            <img 
              src="/maharashtra_map.png" 
              alt="Maharashtra Official Administrative Revenue Divisions Map" 
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                pointerEvents: 'none',
                userSelect: 'none',
                border: 'none',
                outline: 'none'
              }}
            />

            {/* 2. Seamless Borderless Interactive SVG Overlay */}
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
                <filter id="adminSoftGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. KONKAN DIVISION */}
              <path 
                d="M 142 242 L 150 256 L 170 258 L 192 268 L 188 282 L 198 292 L 196 298 L 212 312 L 212 318 L 228 336 L 228 342 L 222 340 L 214 354 L 192 364 L 198 368 L 198 374 L 182 392 L 184 398 L 178 406 L 182 416 L 178 424 L 188 440 L 190 452 L 210 470 L 208 480 L 214 488 L 200 502 L 204 504 L 202 520 L 212 524 L 220 538 L 220 556 L 214 560 L 214 570 L 218 574 L 216 580 L 226 584 L 224 588 L 232 598 L 232 604 L 224 614 L 224 626 L 232 630 L 232 638 L 214 648 L 212 662 L 222 668 L 234 668 L 236 686 L 244 690 L 244 694 L 234 696 L 230 704 L 234 708 L 238 704 L 248 704 L 256 712 L 254 722 L 262 736 L 258 748 L 252 752 L 246 750 L 244 738 L 236 732 L 220 738 L 216 724 L 206 718 L 202 700 L 188 690 L 196 680 L 186 656 L 190 652 L 186 646 L 188 636 L 182 614 L 184 592 L 176 578 L 176 562 L 168 556 L 170 534 L 164 530 L 166 520 L 162 516 L 162 504 L 154 494 L 156 486 L 150 478 L 150 464 L 142 454 L 144 424 L 136 412 L 140 400 L 154 400 L 146 388 L 160 376 L 152 374 L 152 360 L 148 358 L 144 362 L 144 374 L 136 374 L 132 384 L 132 354 L 110 338 L 110 334 L 124 346 L 138 340 L 128 336 L 126 322 L 122 320 L 124 306 L 122 298 L 116 296 L 116 284 L 122 270 L 124 248 L 136 248 L 140 244 Z"
                fill={getDivisionFill('konkan', 'mumbai')}
                stroke="transparent"
                strokeWidth={0}
                style={{ cursor: 'pointer', transition: 'fill 0.25s ease' }}
                onClick={() => setSelectedDistrictKey('mumbai')}
                onMouseEnter={() => setHoveredDivisionId('konkan')}
                onMouseLeave={() => setHoveredDivisionId(null)}
              >
                <title>{lang === 'mr' ? 'कोकण विभाग (मुंबई व ठाणे कॉरिडॉर)' : (lang === 'hi' ? 'कोंकण संभाग (मुंबई एवं ठाणे गलियारा)' : 'Konkan Division (Mumbai & Thane Corridor)')}</title>
              </path>

              {/* 2. NASHIK DIVISION */}
              <path 
                d="M 302 42 L 312 46 L 316 56 L 316 62 L 312 64 L 314 74 L 304 84 L 306 86 L 322 80 L 326 86 L 342 88 L 346 92 L 354 86 L 358 90 L 368 90 L 388 114 L 420 114 L 426 120 L 432 114 L 448 120 L 466 114 L 472 120 L 480 118 L 482 122 L 488 122 L 488 132 L 494 134 L 490 142 L 494 152 L 500 156 L 516 152 L 518 158 L 512 162 L 500 156 L 488 164 L 476 186 L 476 200 L 470 206 L 456 208 L 438 200 L 420 212 L 398 208 L 382 222 L 374 236 L 368 236 L 360 244 L 350 238 L 346 240 L 338 252 L 338 262 L 328 288 L 322 290 L 344 308 L 382 316 L 390 324 L 402 326 L 420 338 L 418 348 L 410 356 L 410 368 L 378 374 L 374 366 L 358 366 L 358 380 L 348 380 L 346 388 L 378 418 L 408 404 L 412 404 L 418 414 L 422 412 L 424 418 L 414 428 L 378 436 L 374 444 L 352 454 L 338 448 L 332 440 L 322 440 L 316 424 L 308 420 L 308 414 L 274 376 L 274 368 L 288 356 L 268 356 L 260 352 L 252 340 L 230 336 L 192 284 L 192 266 L 172 254 L 178 248 L 188 248 L 196 238 L 196 216 L 204 208 L 200 204 L 200 194 L 216 194 L 214 198 L 220 198 L 228 206 L 240 200 L 244 186 L 248 188 L 258 180 L 252 172 L 252 156 L 242 152 L 228 138 L 240 134 L 260 114 L 264 104 L 282 104 L 294 96 L 292 92 L 270 90 L 250 100 L 244 98 L 240 88 L 252 78 L 246 58 L 252 60 L 270 50 L 290 52 L 300 44 Z"
                fill={getDivisionFill('nashik', 'nashik')}
                stroke="transparent"
                strokeWidth={0}
                style={{ cursor: 'pointer', transition: 'fill 0.25s ease' }}
                onClick={() => setSelectedDistrictKey('nashik')}
                onMouseEnter={() => setHoveredDivisionId('nashik')}
                onMouseLeave={() => setHoveredDivisionId(null)}
              >
                <title>{lang === 'mr' ? 'नाशिक विभाग (संरक्षण व ॲग्रोटेक कॉरिडॉर)' : (lang === 'hi' ? 'नासिक संभाग (रक्षा एवं एग्रोटेक गलियारा)' : 'Nashik Division (Defense & Agritech Corridor)')}</title>
              </path>

              {/* 3. PUNE DIVISION */}
              <path 
                d="M 232 338 L 250 340 L 264 356 L 282 358 L 274 366 L 272 376 L 306 414 L 306 420 L 314 424 L 320 442 L 326 446 L 332 440 L 344 456 L 374 446 L 382 436 L 392 434 L 396 436 L 394 444 L 408 460 L 410 470 L 422 474 L 446 452 L 446 448 L 460 456 L 480 448 L 470 462 L 472 470 L 468 480 L 474 488 L 472 492 L 460 488 L 456 500 L 464 512 L 474 510 L 476 518 L 486 516 L 496 528 L 508 524 L 522 534 L 514 542 L 512 558 L 518 564 L 516 570 L 490 566 L 476 572 L 460 562 L 442 562 L 436 554 L 426 570 L 436 582 L 440 600 L 436 610 L 432 606 L 426 612 L 398 610 L 388 622 L 382 622 L 370 612 L 356 612 L 348 632 L 322 634 L 318 642 L 322 650 L 302 642 L 294 654 L 284 648 L 280 650 L 276 654 L 286 664 L 280 680 L 298 686 L 302 692 L 300 700 L 294 700 L 288 706 L 290 710 L 298 708 L 298 714 L 284 738 L 272 732 L 266 736 L 260 734 L 258 712 L 248 702 L 232 702 L 246 692 L 238 684 L 236 668 L 222 666 L 214 658 L 216 648 L 232 640 L 234 630 L 224 622 L 234 598 L 226 588 L 228 584 L 218 580 L 220 574 L 214 564 L 222 554 L 220 534 L 204 516 L 204 502 L 214 490 L 210 480 L 212 470 L 190 450 L 192 446 L 180 424 L 184 416 L 184 392 L 194 384 L 202 362 L 216 354 L 222 342 L 232 340 Z"
                fill={getDivisionFill('pune', 'pune')}
                stroke="transparent"
                strokeWidth={0}
                style={{ cursor: 'pointer', transition: 'fill 0.25s ease' }}
                onClick={() => setSelectedDistrictKey('pune')}
                onMouseEnter={() => setHoveredDivisionId('pune')}
                onMouseLeave={() => setHoveredDivisionId(null)}
              >
                <title>{lang === 'mr' ? 'पुणे विभाग (ऑटो, ईव्ही व आयटी कॉरिडॉर)' : (lang === 'hi' ? 'पुणे संभाग (ऑटो, ईवी एवं आईटी गलियारा)' : 'Pune Division (Auto, EV & IT Corridor)')}</title>
              </path>

              {/* 4. CHHATRAPATI SAMBHAJI NAGAR / MARATHWADA */}
              <path 
                d="M 438 202 L 454 210 L 468 210 L 476 202 L 480 204 L 472 216 L 468 236 L 472 240 L 488 236 L 494 242 L 492 252 L 478 272 L 496 290 L 526 280 L 540 288 L 550 288 L 574 272 L 594 270 L 604 278 L 622 278 L 644 304 L 660 310 L 672 326 L 666 332 L 668 336 L 676 336 L 686 324 L 694 330 L 710 328 L 720 316 L 716 308 L 684 300 L 682 292 L 690 284 L 722 282 L 736 292 L 734 300 L 728 304 L 728 330 L 716 336 L 716 352 L 702 354 L 698 346 L 682 348 L 680 370 L 668 378 L 668 384 L 678 388 L 692 402 L 680 404 L 676 414 L 666 420 L 666 432 L 658 430 L 654 434 L 646 450 L 650 458 L 644 458 L 638 464 L 636 456 L 628 458 L 626 444 L 614 448 L 608 456 L 608 466 L 596 476 L 582 472 L 576 478 L 582 488 L 576 494 L 576 502 L 568 506 L 572 512 L 556 518 L 552 530 L 538 518 L 528 532 L 522 532 L 512 524 L 494 526 L 490 516 L 478 518 L 474 508 L 464 508 L 458 502 L 460 492 L 470 494 L 474 490 L 470 464 L 482 450 L 480 446 L 468 454 L 458 454 L 446 444 L 444 452 L 422 472 L 410 468 L 410 460 L 396 444 L 396 436 L 414 430 L 430 412 L 418 412 L 410 400 L 380 416 L 346 386 L 348 382 L 360 382 L 356 372 L 360 366 L 372 366 L 376 374 L 398 382 L 402 378 L 398 370 L 412 370 L 416 366 L 412 364 L 412 356 L 424 340 L 380 314 L 344 306 L 328 288 L 346 244 L 352 244 L 358 250 L 368 238 L 380 234 L 394 212 L 404 208 L 412 214 L 420 214 L 436 204 Z"
                fill={getDivisionFill('marathwada', 'aurangabad')}
                stroke="transparent"
                strokeWidth={0}
                style={{ cursor: 'pointer', transition: 'fill 0.25s ease' }}
                onClick={() => setSelectedDistrictKey('aurangabad')}
                onMouseEnter={() => setHoveredDivisionId('marathwada')}
                onMouseLeave={() => setHoveredDivisionId(null)}
              >
                <title>{lang === 'mr' ? 'छत्रपती संभाजीनगर विभाग (AURIC स्मार्ट सिटी कॉरिडॉर)' : (lang === 'hi' ? 'छत्रपति संभाजीनगर संभाग (AURIC स्मार्ट सिटी गलियारा)' : 'Chhatrapati Sambhaji Nagar Division (AURIC Corridor)')}</title>
              </path>

              {/* 5. AMRAVATI DIVISION */}
              <path 
                d="M 618 76 L 640 76 L 646 82 L 652 100 L 634 100 L 642 118 L 658 116 L 668 120 L 676 114 L 694 116 L 714 104 L 716 98 L 736 92 L 740 92 L 744 106 L 752 102 L 760 104 L 750 104 L 740 118 L 732 118 L 728 124 L 708 120 L 704 124 L 704 134 L 716 166 L 728 180 L 728 206 L 766 222 L 776 236 L 788 236 L 816 262 L 818 278 L 824 286 L 792 304 L 796 308 L 800 306 L 806 318 L 814 318 L 830 328 L 810 318 L 802 320 L 802 310 L 794 308 L 788 296 L 748 292 L 734 282 L 690 282 L 682 290 L 682 298 L 688 304 L 706 310 L 714 308 L 718 310 L 718 316 L 708 328 L 684 324 L 676 334 L 668 334 L 672 322 L 658 308 L 636 296 L 634 288 L 616 274 L 604 276 L 590 268 L 570 272 L 558 284 L 544 288 L 530 278 L 514 286 L 494 288 L 482 276 L 480 270 L 494 252 L 494 240 L 490 236 L 472 238 L 468 232 L 474 216 L 482 208 L 476 190 L 488 166 L 504 158 L 518 162 L 526 148 L 544 144 L 552 130 L 548 124 L 568 92 L 576 92 L 592 80 L 602 78 L 610 82 L 616 78 Z"
                fill={getDivisionFill('amravati', 'amravati')}
                stroke="transparent"
                strokeWidth={0}
                style={{ cursor: 'pointer', transition: 'fill 0.25s ease' }}
                onClick={() => setSelectedDistrictKey('amravati')}
                onMouseEnter={() => setHoveredDivisionId('amravati')}
                onMouseLeave={() => setHoveredDivisionId(null)}
              >
                <title>{lang === 'mr' ? 'अमरावती विभाग (टेक्सटाईल व ॲग्रो कॉरिडॉर)' : (lang === 'hi' ? 'अमरावती संभाग (टेक्सटाइल एवं एग्रो गलियारा)' : 'Amravati Division (Textile & Agro Corridor)')}</title>
              </path>

              {/* 6. NAGPUR DIVISION */}
              <path 
                d="M 832 80 L 840 84 L 858 84 L 862 100 L 886 90 L 898 98 L 910 100 L 940 84 L 964 110 L 978 118 L 976 122 L 968 116 L 938 122 L 940 128 L 950 124 L 960 130 L 964 124 L 966 128 L 972 126 L 976 130 L 974 136 L 970 134 L 960 142 L 958 150 L 974 164 L 978 190 L 972 200 L 982 200 L 986 204 L 982 220 L 986 228 L 968 238 L 960 238 L 960 248 L 978 256 L 978 268 L 976 272 L 964 274 L 972 278 L 964 286 L 972 292 L 978 290 L 984 296 L 990 296 L 1002 326 L 1008 318 L 1012 324 L 1018 324 L 1006 330 L 1012 338 L 1004 346 L 986 334 L 972 342 L 956 364 L 952 388 L 958 398 L 948 412 L 938 414 L 916 402 L 918 394 L 908 370 L 916 362 L 914 354 L 918 336 L 910 320 L 904 320 L 896 312 L 886 312 L 874 322 L 868 318 L 860 322 L 858 318 L 852 320 L 836 310 L 832 314 L 834 322 L 828 326 L 806 316 L 804 308 L 794 306 L 794 302 L 826 286 L 818 276 L 816 260 L 788 236 L 776 234 L 768 222 L 740 212 L 728 202 L 730 180 L 714 160 L 714 148 L 704 126 L 708 122 L 728 124 L 738 120 L 752 104 L 784 108 L 792 102 L 798 106 L 798 96 L 802 92 L 822 90 L 830 82 Z"
                fill={getDivisionFill('nagpur', 'nagpur')}
                stroke="transparent"
                strokeWidth={0}
                style={{ cursor: 'pointer', transition: 'fill 0.25s ease' }}
                onClick={() => setSelectedDistrictKey('nagpur')}
                onMouseEnter={() => setHoveredDivisionId('nagpur')}
                onMouseLeave={() => setHoveredDivisionId(null)}
              >
                <title>{lang === 'mr' ? 'नागपूर विभाग (मिहान, लॉजिस्टिक्स व एरोस्पेस कॉरिडॉर)' : (lang === 'hi' ? 'नागपुर संभाग (मिहान, लॉजिस्टिक्स एवं एयरोस्पेस गलियारा)' : 'Nagpur Division (MIHAN Logistics & Aerospace Corridor)')}</title>
              </path>

              {/* Bottom Right Legend Hotspots Overlay (Borderless) */}
              <rect 
                x="695" y="498" width="295" height="38" rx="6"
                fill={isDivisionSelected('amravati') ? 'rgba(234, 88, 12, 0.25)' : (hoveredDivisionId === 'amravati' ? 'rgba(234, 88, 12, 0.12)' : 'transparent')}
                stroke="transparent"
                strokeWidth={0}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedDistrictKey('amravati')}
                onMouseEnter={() => setHoveredDivisionId('amravati')}
                onMouseLeave={() => setHoveredDivisionId(null)}
              />
              <rect 
                x="695" y="538" width="295" height="38" rx="6"
                fill={isDivisionSelected('marathwada') ? 'rgba(234, 88, 12, 0.25)' : (hoveredDivisionId === 'marathwada' ? 'rgba(234, 88, 12, 0.12)' : 'transparent')}
                stroke="transparent"
                strokeWidth={0}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedDistrictKey('aurangabad')}
                onMouseEnter={() => setHoveredDivisionId('marathwada')}
                onMouseLeave={() => setHoveredDivisionId(null)}
              />
              <rect 
                x="695" y="578" width="295" height="38" rx="6"
                fill={isDivisionSelected('konkan') ? 'rgba(234, 88, 12, 0.25)' : (hoveredDivisionId === 'konkan' ? 'rgba(234, 88, 12, 0.12)' : 'transparent')}
                stroke="transparent"
                strokeWidth={0}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedDistrictKey('mumbai')}
                onMouseEnter={() => setHoveredDivisionId('konkan')}
                onMouseLeave={() => setHoveredDivisionId(null)}
              />
              <rect 
                x="695" y="618" width="295" height="38" rx="6"
                fill={isDivisionSelected('nagpur') ? 'rgba(234, 88, 12, 0.25)' : (hoveredDivisionId === 'nagpur' ? 'rgba(234, 88, 12, 0.12)' : 'transparent')}
                stroke="transparent"
                strokeWidth={0}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedDistrictKey('nagpur')}
                onMouseEnter={() => setHoveredDivisionId('nagpur')}
                onMouseLeave={() => setHoveredDivisionId(null)}
              />
              <rect 
                x="695" y="658" width="295" height="38" rx="6"
                fill={isDivisionSelected('nashik') ? 'rgba(234, 88, 12, 0.25)' : (hoveredDivisionId === 'nashik' ? 'rgba(234, 88, 12, 0.12)' : 'transparent')}
                stroke="transparent"
                strokeWidth={0}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedDistrictKey('nashik')}
                onMouseEnter={() => setHoveredDivisionId('nashik')}
                onMouseLeave={() => setHoveredDivisionId(null)}
              />
              <rect 
                x="695" y="698" width="295" height="38" rx="6"
                fill={isDivisionSelected('pune') ? 'rgba(234, 88, 12, 0.25)' : (hoveredDivisionId === 'pune' ? 'rgba(234, 88, 12, 0.12)' : 'transparent')}
                stroke="transparent"
                strokeWidth={0}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedDistrictKey('pune')}
                onMouseEnter={() => setHoveredDivisionId('pune')}
                onMouseLeave={() => setHoveredDivisionId(null)}
              />
            </svg>
          </div>

          {/* Active Division Indicator Bar */}
          <div style={{ marginTop: '12px', fontSize: '0.82rem', color: 'var(--navy-deep)', background: 'var(--bg-secondary)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
            <div>
              <span style={{ color: 'var(--saffron-primary)', fontWeight: 800 }}>
                {lang === 'mr' ? 'सक्रिय विभाग: ' : (lang === 'hi' ? 'सक्रिय संभाग: ' : 'ACTIVE DIVISION: ')}
              </span>
              <strong>{currentDistrict.division}</strong> ({localizedDistrictName})
            </div>
            <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>
              {lang === 'mr' ? 'मागणी निर्देशांक: ' : (lang === 'hi' ? 'मांग सूचकांक: ' : 'Demand Index: ')}
              {currentDistrict.employerDemandIndex}
            </span>
          </div>

          {/* District Quick Select Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
            {Object.keys(adminDistrictIntelligence).map((key) => {
              const dObj = adminDistrictIntelligence[key];
              const dName = lang === 'mr' ? (dObj.nameMr || dObj.name) : (lang === 'hi' ? (dObj.nameHi || dObj.name) : dObj.name);
              return (
                <button
                  key={key}
                  type="button"
                  className={`btn btn-sm ${selectedDistrictKey === key ? 'btn-navy' : 'btn-outline'}`}
                  style={{ padding: '4px 10px', fontSize: '0.76rem' }}
                  onClick={() => setSelectedDistrictKey(key)}
                >
                  {dName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed District Intelligence Panel */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-xs)' }} id="admin-sec-district-intelligence">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <span className="badge badge-saffron" style={{ marginBottom: '4px' }}>
                {currentDistrict.division}
              </span>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                {localizedDistrictName} {lang === 'mr' ? 'जिल्हा बुद्धिमत्ता' : (lang === 'hi' ? 'जिला खुफिया' : 'District Intelligence')}
              </h3>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                {lang === 'mr' ? 'नियोक्ता मागणी' : (lang === 'hi' ? 'नियोक्ता मांग' : 'EMPLOYER DEMAND')}
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--success-dark)' }}>{currentDistrict.employerDemandIndex}</div>
            </div>
          </div>

          {/* Quick Metric Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                {lang === 'mr' ? 'प्रशिक्षण क्षमता' : (lang === 'hi' ? 'प्रशिक्षण क्षमता' : 'CAPACITY')}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                {currentDistrict.currentCapacity} {lang === 'mr' ? 'जागा' : (lang === 'hi' ? 'सीटें' : 'seats')}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                {lang === 'mr' ? 'मागणी' : (lang === 'hi' ? 'मांग' : 'DEMAND')}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                {currentDistrict.estimatedDemand} {lang === 'mr' ? 'नोकऱ्या' : (lang === 'hi' ? 'नौकरियां' : 'jobs')}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                {lang === 'mr' ? 'तूट / तफावत' : (lang === 'hi' ? 'कमी / अंतर' : 'DEFICIT GAP')}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#dc2626' }}>
                {currentDistrict.gap} {lang === 'mr' ? 'जागा' : (lang === 'hi' ? 'सीटें' : 'seats')}
              </div>
            </div>
          </div>

          {/* Top Industries */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--navy-deep)', textTransform: 'uppercase', marginBottom: '4px' }}>
              {lang === 'mr' ? 'प्रमुख जिल्हा उद्योग:' : (lang === 'hi' ? 'प्रमुख जिला उद्योग:' : 'Top District Industries:')}
            </div>
            <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              {currentDistrict.topIndustries.join(' • ')}
            </div>
          </div>

          {/* Top High-Demand Occupations */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--navy-deep)', textTransform: 'uppercase', marginBottom: '4px' }}>
              {lang === 'mr' ? 'उच्च मागणी असणारे व्यवसाय:' : (lang === 'hi' ? 'उच्च मांग वाले व्यवसाय:' : 'High-Demand Occupations:')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {currentDistrict.topSkills.map((sk, idx) => (
                <span key={idx} className="badge badge-navy" style={{ fontSize: '0.75rem' }}>
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Critical Skill Shortages */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#b91c1c', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertTriangle size={12} />
              {lang === 'mr' ? 'गंभीर कौशल्य कमतरता:' : (lang === 'hi' ? 'गंभीर कौशल कमी:' : 'Acute Skill Shortages:')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {currentDistrict.skillShortages.map((sh, idx) => (
                <span key={idx} className="badge" style={{ background: '#fef2f2', color: '#b91c1c', borderColor: '#fecaca', fontSize: '0.75rem' }}>
                  ⚠️ {sh}
                </span>
              ))}
            </div>
          </div>

          {/* Policy Recommendation Box */}
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '12px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: '#1e40af', marginBottom: '16px' }}>
            <strong>{lang === 'mr' ? 'अधिकाऱ्यांसाठी कृती टिपणी:' : (lang === 'hi' ? 'अधिकारी कार्य ज्ञापन:' : 'Officer Action Memo:')}</strong> {currentDistrict.recommendedAction}
          </div>

          {/* Primary Action Button */}
          <button 
            type="button" 
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => onGeneratePlanForDistrict(localizedDistrictName)}
          >
            <Sparkles size={16} />
            {lang === 'mr' 
              ? `जिल्हा कौशल्य आराखडा तयार करा (${localizedDistrictName})` 
              : (lang === 'hi' 
                ? `जिला कौशल योजना तैयार करें (${localizedDistrictName})` 
                : `Generate District Skill Plan (${currentDistrict.name})`)}
          </button>
        </div>
      </div>
    </div>
  );
}
