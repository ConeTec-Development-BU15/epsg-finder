export default function getFormInput(id: string) {
  const element = document.getElementById(id)! as HTMLInputElement;
  if (!element) return '';
  return Number.parseFloat(element.value).toString();
}