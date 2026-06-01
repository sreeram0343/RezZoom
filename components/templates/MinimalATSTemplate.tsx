import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import { ResumeContent, TemplateCustomization } from '@/types/resume';

// Need to register fonts for react-pdf to use them
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
  ]
});

interface MinimalATSTemplateProps {
  content: ResumeContent;
  customization: TemplateCustomization;
}

export const MinimalATSTemplate: React.FC<MinimalATSTemplateProps> = ({ content, customization }) => {
  // Map our UI settings to PDF styles
  const getMargin = () => {
    switch (customization.margins) {
      case 'tight': return 24;
      case 'wide': return 48;
      default: return 36;
    }
  };

  const getFontSize = (baseSize: number) => {
    switch (customization.fontSize) {
      case 'compact': return baseSize - 1;
      case 'spacious': return baseSize + 1;
      default: return baseSize;
    }
  };

  const primaryColor = customization.primaryColor || '#000000';

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: getMargin(),
      fontFamily: 'Open Sans',
    },
    section: {
      marginBottom: 12,
    },
    header: {
      marginBottom: 16,
      textAlign: customization.headerStyle === 'centered' ? 'center' : 'left',
    },
    name: {
      fontSize: getFontSize(24),
      fontWeight: 700,
      marginBottom: 4,
      color: primaryColor,
    },
    title: {
      fontSize: getFontSize(14),
      fontWeight: 600,
      marginBottom: 8,
      color: '#333333',
    },
    contactInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: customization.headerStyle === 'centered' ? 'center' : 'flex-start',
      gap: 8,
      fontSize: getFontSize(10),
      color: '#555555',
    },
    contactItem: {
      marginRight: 8,
    },
    sectionTitle: {
      fontSize: getFontSize(14),
      fontWeight: 700,
      color: primaryColor,
      textTransform: 'uppercase',
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
      paddingBottom: 2,
      marginBottom: 8,
      marginTop: 8,
    },
    summaryText: {
      fontSize: getFontSize(10),
      lineHeight: 1.5,
      color: '#333333',
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 2,
    },
    itemTitle: {
      fontSize: getFontSize(11),
      fontWeight: 700,
      color: '#000000',
    },
    itemSubtitle: {
      fontSize: getFontSize(11),
      color: '#555555',
      fontStyle: 'italic',
    },
    itemDate: {
      fontSize: getFontSize(10),
      color: '#666666',
    },
    bulletPoint: {
      flexDirection: 'row',
      marginBottom: 4,
      paddingLeft: 8,
    },
    bullet: {
      width: 4,
      fontSize: getFontSize(10),
      marginRight: 4,
    },
    bulletText: {
      flex: 1,
      fontSize: getFontSize(10),
      lineHeight: 1.4,
      color: '#333333',
    },
    skillCategory: {
      marginBottom: 4,
    },
    skillLabel: {
      fontSize: getFontSize(10),
      fontWeight: 700,
      marginRight: 4,
    },
    skillText: {
      fontSize: getFontSize(10),
      color: '#333333',
    },
    link: {
      color: primaryColor,
      textDecoration: 'none',
    }
  });

  const { personalInfo, summary, experience, education, skills, projects } = content;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || 'Your Name'}</Text>
          {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
          
          <View style={styles.contactInfo}>
            {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
            {personalInfo.linkedinUrl && (
              <Link src={personalInfo.linkedinUrl} style={styles.link}>
                <Text style={styles.contactItem}>LinkedIn</Text>
              </Link>
            )}
            {personalInfo.githubUrl && (
              <Link src={personalInfo.githubUrl} style={styles.link}>
                <Text style={styles.contactItem}>GitHub</Text>
              </Link>
            )}
            {personalInfo.portfolioUrl && (
              <Link src={personalInfo.portfolioUrl} style={styles.link}>
                <Text style={styles.contactItem}>Portfolio</Text>
              </Link>
            )}
          </View>
        </View>

        {/* Dynamic Section Ordering */}
        {customization.sectionOrder.map((sectionKey) => {
          switch (sectionKey) {
            case 'summary':
              return summary ? (
                <View key="summary" style={styles.section}>
                  <Text style={styles.sectionTitle}>Professional Summary</Text>
                  <Text style={styles.summaryText}>{summary}</Text>
                </View>
              ) : null;

            case 'experience':
              return experience && experience.length > 0 ? (
                <View key="experience" style={styles.section}>
                  <Text style={styles.sectionTitle}>Experience</Text>
                  {experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                      <View style={styles.itemHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                           <Text style={styles.itemTitle}>{exp.title}</Text>
                           {exp.company && <Text style={styles.itemSubtitle}>, {exp.company}</Text>}
                        </View>
                        <Text style={styles.itemDate}>
                          {exp.startDate} {exp.startDate && exp.endDate ? '-' : ''} {exp.endDate}
                        </Text>
                      </View>
                      {exp.location && <Text style={{ fontSize: getFontSize(9), color: '#666', marginBottom: 4 }}>{exp.location}</Text>}
                      
                      <View style={{ marginTop: 4 }}>
                        {exp.bullets.map((bullet, j) => (
                          <View key={j} style={styles.bulletPoint}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletText}>{bullet.text}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              ) : null;

            case 'education':
              return education && education.length > 0 ? (
                <View key="education" style={styles.section}>
                  <Text style={styles.sectionTitle}>Education</Text>
                  {education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 6 }}>
                      <View style={styles.itemHeader}>
                        <Text style={styles.itemTitle}>{edu.institution}</Text>
                        <Text style={styles.itemDate}>
                          {edu.startDate} {edu.startDate && edu.endDate ? '-' : ''} {edu.endDate}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.itemSubtitle}>
                          {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                        </Text>
                        {edu.gpa && <Text style={{ fontSize: getFontSize(10), color: '#555' }}>GPA: {edu.gpa}</Text>}
                      </View>
                    </View>
                  ))}
                </View>
              ) : null;

            case 'projects':
              return projects && projects.length > 0 ? (
                <View key="projects" style={styles.section}>
                  <Text style={styles.sectionTitle}>Projects</Text>
                  {projects.map((proj, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                      <View style={styles.itemHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                           <Text style={styles.itemTitle}>{proj.name}</Text>
                           {proj.githubUrl && (
                             <Link src={proj.githubUrl} style={styles.link}>
                               <Text style={{ fontSize: getFontSize(8) }}>[GitHub]</Text>
                             </Link>
                           )}
                        </View>
                        <Text style={styles.itemDate}>
                          {proj.startDate} {proj.startDate && proj.endDate ? '-' : ''} {proj.endDate}
                        </Text>
                      </View>
                      {proj.techStack && proj.techStack.length > 0 && (
                        <Text style={{ fontSize: getFontSize(9), color: '#666', fontStyle: 'italic', marginBottom: 2 }}>
                          {proj.techStack.join(' | ')}
                        </Text>
                      )}
                      {proj.description && (
                         <Text style={{ fontSize: getFontSize(10), color: '#333', marginBottom: 4 }}>{proj.description}</Text>
                      )}
                      <View style={{ marginTop: 2 }}>
                        {proj.bullets.map((bullet, j) => (
                          <View key={j} style={styles.bulletPoint}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletText}>{bullet.text}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              ) : null;

            case 'skills':
              const hasSkills = Object.values(skills).some(arr => arr && arr.length > 0);
              return hasSkills ? (
                <View key="skills" style={styles.section}>
                  <Text style={styles.sectionTitle}>Skills</Text>
                  <View style={{ flexDirection: 'column', gap: 2 }}>
                    {skills.technical && skills.technical.length > 0 && (
                      <View style={styles.skillCategory}>
                        <Text style={styles.skillText}>
                          <Text style={styles.skillLabel}>Technical: </Text>
                          {skills.technical.join(', ')}
                        </Text>
                      </View>
                    )}
                    {skills.languages && skills.languages.length > 0 && (
                      <View style={styles.skillCategory}>
                        <Text style={styles.skillText}>
                          <Text style={styles.skillLabel}>Languages: </Text>
                          {skills.languages.join(', ')}
                        </Text>
                      </View>
                    )}
                    {skills.frameworks && skills.frameworks.length > 0 && (
                      <View style={styles.skillCategory}>
                        <Text style={styles.skillText}>
                          <Text style={styles.skillLabel}>Frameworks: </Text>
                          {skills.frameworks.join(', ')}
                        </Text>
                      </View>
                    )}
                    {skills.tools && skills.tools.length > 0 && (
                      <View style={styles.skillCategory}>
                        <Text style={styles.skillText}>
                          <Text style={styles.skillLabel}>Tools: </Text>
                          {skills.tools.join(', ')}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ) : null;

            default:
              return null;
          }
        })}

      </Page>
    </Document>
  );
};
