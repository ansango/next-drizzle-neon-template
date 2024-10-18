

export function Footer() {
  return (
    <footer className="py-20 px-5">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="text-center md:text-left text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>
        <div className="text-center md:text-right text-sm text-muted-foreground">
          <p>
            Made with ❤️ by{" "}
            <a
              href="
                https://github.com/ansango"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              ansango
            </a>
          </p>
        </div>
      </div>

    </footer>
  )
}