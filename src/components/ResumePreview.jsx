import React from 'react';

// Helper to render text area blocks cleanly
const RenderTextBlock = ({ text }) => {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, idx) => {
        if (line.trim() === '') return <div key={idx} style={{ height: '4pt' }}></div>;
        
        // Handle Bullet Points
        if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
          return (
            <div key={idx} style={{ marginBottom: '2pt', paddingLeft: '14pt', textIndent: '-10pt', display: 'flex' }}>
              <span style={{ marginRight: '6pt' }}>•</span>
              <span>{line.replace(/^[-•]\s*/, '')}</span>
            </div>
          );
        }

        // Handle Split Lines (Name on Left, Detail/Date on Right) using " — " or " | "
        let leftPart = line;
        let rightPart = "";
        
        if (line.includes(' — ')) {
          [leftPart, rightPart] = line.split(' — ');
        } else if (line.includes(' | ')) {
          [leftPart, rightPart] = line.split(' | ');
        }

        if (rightPart) {
          return (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2pt' }}>
              <span style={{ fontWeight: 'bold' }}>{leftPart.trim()}</span>
              <span style={{ fontStyle: 'italic' }}>{rightPart.trim()}</span>
            </div>
          );
        }

        // If it's a regular bold skill line "Category: Items"
        if (line.includes(': ') && !line.includes('http')) {
           const [cat, items] = line.split(': ');
           return (
             <div key={idx} style={{ marginBottom: '2pt' }}>
               <span style={{ fontWeight: 'bold' }}>{cat}:</span> {items}
             </div>
           );
        }

        // Default line
        return (
          <div key={idx} style={{ marginBottom: '2pt' }}>
            {line}
          </div>
        );
      })}
    </>
  );
};

/* --- TEMPLATE 1: MODERN --- */
const ModernTemplate = ({ data }) => (
  <div style={{ fontFamily: "'Inter', sans-serif", color: '#1e293b' }}>
    <header style={{ borderBottom: '4px solid #3b82f6', paddingBottom: '16pt', marginBottom: '16pt' }}>
      <h1 style={{ fontSize: '28pt', fontWeight: '800', margin: '0 0 8pt 0', color: '#0f172a' }}>{data.personalInfo.name}</h1>
      <div style={{ display: 'flex', gap: '16pt', fontSize: '10pt', color: '#64748b' }}>
        <span>{data.personalInfo.email}</span>
        <span>•</span>
        <span>{data.personalInfo.phone}</span>
        <span>•</span>
        <span>{data.personalInfo.linkedin}</span>
      </div>
    </header>
    
    <div style={{ display: 'flex', gap: '24pt' }}>
      <div style={{ flex: '1' }}>
        {data.experience && (
          <div style={{ marginBottom: '16pt' }}>
            <h3 style={{ fontSize: '12pt', fontWeight: '700', color: '#3b82f6', textTransform: 'uppercase', marginBottom: '8pt' }}>Experience</h3>
            <div style={{ fontSize: '10pt', lineHeight: '1.5' }}>
              <RenderTextBlock text={data.experience} />
            </div>
          </div>
        )}
        {data.projects && (
          <div style={{ marginBottom: '16pt' }}>
            <h3 style={{ fontSize: '12pt', fontWeight: '700', color: '#3b82f6', textTransform: 'uppercase', marginBottom: '8pt' }}>Projects</h3>
            <div style={{ fontSize: '10pt', lineHeight: '1.5' }}>
              <RenderTextBlock text={data.projects} />
            </div>
          </div>
        )}
      </div>
      <div style={{ width: '2in' }}>
        {data.skills && (
          <div style={{ marginBottom: '16pt' }}>
            <h3 style={{ fontSize: '12pt', fontWeight: '700', color: '#3b82f6', textTransform: 'uppercase', marginBottom: '8pt' }}>Skills</h3>
            <div style={{ fontSize: '10pt', lineHeight: '1.5' }}>
              <RenderTextBlock text={data.skills} />
            </div>
          </div>
        )}
        {data.education && (
          <div style={{ marginBottom: '16pt' }}>
            <h3 style={{ fontSize: '12pt', fontWeight: '700', color: '#3b82f6', textTransform: 'uppercase', marginBottom: '8pt' }}>Education</h3>
            <div style={{ fontSize: '10pt', lineHeight: '1.5' }}>
              <RenderTextBlock text={data.education} />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

/* --- TEMPLATE 2: MINIMAL --- */
const MinimalTemplate = ({ data }) => (
  <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: '#333' }}>
    <header style={{ textAlign: 'center', marginBottom: '24pt' }}>
      <h1 style={{ fontSize: '24pt', fontWeight: '300', letterSpacing: '2px', margin: '0 0 8pt 0' }}>{data.personalInfo.name.toUpperCase()}</h1>
      <div style={{ fontSize: '9pt', color: '#666', letterSpacing: '1px' }}>
        {data.personalInfo.email} &nbsp;|&nbsp; {data.personalInfo.phone} &nbsp;|&nbsp; {data.personalInfo.linkedin}
      </div>
    </header>
    
    {data.experience && (
      <div style={{ marginBottom: '20pt' }}>
        <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '4pt', marginBottom: '12pt' }}>Experience</h3>
        <div style={{ fontSize: '10pt', lineHeight: '1.6' }}>
          <RenderTextBlock text={data.experience} />
        </div>
      </div>
    )}
    {data.projects && (
      <div style={{ marginBottom: '20pt' }}>
        <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '4pt', marginBottom: '12pt' }}>Projects</h3>
        <div style={{ fontSize: '10pt', lineHeight: '1.6' }}>
          <RenderTextBlock text={data.projects} />
        </div>
      </div>
    )}
    {data.education && (
      <div style={{ marginBottom: '20pt' }}>
        <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '4pt', marginBottom: '12pt' }}>Education</h3>
        <div style={{ fontSize: '10pt', lineHeight: '1.6' }}>
          <RenderTextBlock text={data.education} />
        </div>
      </div>
    )}
    {data.skills && (
      <div style={{ marginBottom: '20pt' }}>
        <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '4pt', marginBottom: '12pt' }}>Skills</h3>
        <div style={{ fontSize: '10pt', lineHeight: '1.6' }}>
          <RenderTextBlock text={data.skills} />
        </div>
      </div>
    )}
  </div>
);

/* --- TEMPLATE 3: PROFESSIONAL (ATS LATEX STYLE) --- */
const ProfessionalTemplate = ({ data }) => {
  // Join non-empty contact info
  const contactInfo = [
    data.personalInfo.location,
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.linkedin,
    data.personalInfo.github
  ].filter(Boolean).join(' | ');

  return (
    <div style={{ fontFamily: "'Times New Roman', Times, serif", color: '#000', lineHeight: '1.4' }}>
      <header style={{ textAlign: 'center', marginBottom: '12pt' }}>
        <h1 style={{ fontSize: '24pt', fontWeight: 'bold', margin: '0 0 4pt 0', letterSpacing: '1px' }}>
          {data.personalInfo.name}
        </h1>
        <div style={{ fontSize: '10pt', marginBottom: '2pt' }}>{contactInfo}</div>
      </header>
      
      {data.education && (
        <div style={{ marginBottom: '12pt' }}>
          <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4pt', borderBottom: '1px solid #000' }}>Education</h3>
          <div style={{ fontSize: '10pt' }}>
            <RenderTextBlock text={data.education} />
          </div>
        </div>
      )}

      {data.experience && (
        <div style={{ marginBottom: '12pt' }}>
          <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4pt', borderBottom: '1px solid #000' }}>Experience</h3>
          <div style={{ fontSize: '10pt' }}>
            <RenderTextBlock text={data.experience} />
          </div>
        </div>
      )}

      {data.projects && (
        <div style={{ marginBottom: '12pt' }}>
          <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4pt', borderBottom: '1px solid #000' }}>Projects</h3>
          <div style={{ fontSize: '10pt' }}>
            <RenderTextBlock text={data.projects} />
          </div>
        </div>
      )}

      {data.skills && (
        <div style={{ marginBottom: '12pt' }}>
          <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4pt', borderBottom: '1px solid #000' }}>Technical Skills</h3>
          <div style={{ fontSize: '10pt' }}>
            <RenderTextBlock text={data.skills} />
          </div>
        </div>
      )}

      {data.certifications && (
        <div style={{ marginBottom: '12pt' }}>
          <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4pt', borderBottom: '1px solid #000' }}>Certifications</h3>
          <div style={{ fontSize: '10pt' }}>
            <RenderTextBlock text={data.certifications} />
          </div>
        </div>
      )}

      {data.achievements && (
        <div style={{ marginBottom: '12pt' }}>
          <h3 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4pt', borderBottom: '1px solid #000' }}>Achievements & Leadership</h3>
          <div style={{ fontSize: '10pt' }}>
            <RenderTextBlock text={data.achievements} />
          </div>
        </div>
      )}
    </div>
  );
};

/* --- COMPONENT CONTROLLER --- */
export default function ResumePreview({ data, template }) {
  if (!data) return null;

  return (
    <div 
      className="pdf-preview-content"
      style={{
        padding: '0.8in',
        background: '#fff',
        width: '100%',
        minHeight: '100%',
        margin: '0',
        boxSizing: 'border-box'
      }}
    >
      {template === 1 && <ModernTemplate data={data} />}
      {template === 2 && <MinimalTemplate data={data} />}
      {template === 3 && <ProfessionalTemplate data={data} />}
      {/* Fallback to Modern if unrecognized */}
      {![1, 2, 3].includes(template) && <ModernTemplate data={data} />}
    </div>
  );
}
