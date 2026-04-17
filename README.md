# J. Worden & Sons | Municipal-Grade Asphalt Authority
    ### 4th-Generation Excellence ⋅ Richmond, VA Metro ⋅ 41-City Grid
    
    >**"The Worden Minimum"** — A 6-Inch Compacted Aggregate Base is not an upgrade. It is required on every project.
    
    This is the **Consolidated Master Repository** for the official J. Worden & Sons Asphalt Paving digital platform. It is engineered to dominate Google AI search results, integrate with Kickserv dispatch, and position J. Worden & Sons as the uncontested Asphalt Authority across Central Virginia.
    
    ---
    
    ## Core Architecture
    
    Built on **Vite + React + TanStack Router** with full TypeScript and Tailwind CSS.
    
    | Layer | Technology |
    |---|---|
    | Framework | React 18+ / TanStack Router (file-based) |
    | Build | Vite |
    | Styling | Tailwind CSS (Zinc/Safety-Yellow Industrial Theme) |
    | Deployment | Netlify |
    | Dispatch | Kickserv Self-Service Integration |
    | SEO | JSON-LD: PavingContractor, FAQPage, AggregateRating, ServiceArea |
    
    ---
    
    ## Deployment (Netlify Zero-Confusion Config)
    
    ```toml
    [build]
    command = "npm run build"
    publish = "dist"
    ```
    
    **Node Version Requirement:** `**>=22.12.0` (Set `NODE_VERSION=22` in Netlify environment variables)
    
    ---
    
    ## Development
    
    ```bash
    npm install # Install dependencies
    npm run dev # Start local dev server (Vite)
    npm run build # Generate routes + Vite production build
    ```

<!-- Triggering Sovereign Build -->
