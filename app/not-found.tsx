import { Button, Container, PageHero } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageHero breadcrumbs={false} title="Page not found" accent="let's get you back" intro="Sorry, we could not find that page." />
      <Container className="py-12 text-center"><Button href="/">Back to home</Button></Container>
    </>
  );
}
