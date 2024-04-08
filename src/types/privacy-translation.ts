export enum ParagraphType {
  Text = 'text',
  Submenu = 'submenu',
  SubmenuItem = 'submenuItem',
  Subtitle = 'subtitle',
}

export type PrivacySection = {
  order: number;
  title: string;
  paragraphs: SectionParagraph[];
};

export type SimpleSectionParagraph = {
  order: number;
  type: ParagraphType.SubmenuItem | ParagraphType.Subtitle | ParagraphType.Text;
  content: string;
};

export type SubmenuParagraph = {
  order: number;
  type: ParagraphType.Submenu;
  content: SimpleSectionParagraph[];
};

export type SectionParagraph = SubmenuParagraph | SimpleSectionParagraph;
