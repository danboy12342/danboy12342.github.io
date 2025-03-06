document.addEventListener("DOMContentLoaded", () => {
    const regl = createREGL({
        canvas: document.getElementById('background'),
        attributes: {
            antialias: false
        },
        profile: true
    });

    const canvas = document.getElementById('background');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    console.log("REGL initialized:", regl);  // Check if regl is initialized

    const RESOLUTION = 50;
    const NUM_PARTICLES = 400;
    const PARTICLE_SIZE = 8;

    const drawBackground = regl({
        vert: `precision lowp float;
      attribute vec2 position;
      uniform vec2 resolution;
      varying highp vec2 pos;
      varying float gradient;
      void main() {
        pos = ( position + 1.0 ) / 2.0 * resolution;
        gradient = 1.0 - position.y * 0.625;
        gl_Position = vec4( position, 0.0, 1.0 );
      }`,
        frag: `precision lowp float;
      uniform vec3 color;
      uniform vec2 resolution;
      uniform sampler2D bayerTexture;
      varying highp vec2 pos;
      varying float gradient;
      const float colorDepth = 255.0;

      vec3 dither( vec2 position, vec3 color ) {
        float threshold = texture2D( bayerTexture, position / 8.0 ).a;
        vec3 diff = 1.0 - mod( color * colorDepth, 1.0 );
        return color + diff * vec3(
          float( diff.r < threshold ),
          float( diff.g < threshold ),
          float( diff.b < threshold )
        ) / colorDepth;
      }

      void main() {
        gl_FragColor = vec4( dither( pos, gradient * color ), 1.0 );
      }`,
        primitive: "triangle strip",
        count: 4,
        attributes: {
            position: [
                +1, -1,
                -1, -1,
                +1, +1,
                -1, +1
            ]
        },
        uniforms: {
            color: [0, 0, 0],
            resolution: (context) => [context.viewportWidth, context.viewportHeight],
            bayerTexture: regl.texture({
                data: Uint8Array.of(
                    0, 128, 32, 160, 8, 136, 40, 168,
                    192, 64, 224, 96, 200, 72, 232, 104,
                    48, 176, 16, 144, 56, 184, 24, 152,
                    240, 112, 208, 80, 248, 120, 216, 88,
                    12, 140, 44, 172, 4, 132, 36, 164,
                    204, 76, 236, 108, 196, 68, 228, 100,
                    60, 188, 28, 156, 52, 180, 20, 148,
                    252, 124, 220, 92, 244, 116, 212, 84
                ),
                format: "alpha",
                shape: [8, 8],
                wrap: ["repeat", "repeat"]
            })
        },
        depth: { enable: false }
    });

    const drawParams = {
        time: 0,
        color: [0, 0, 0]
    };

    let lastTime = 0;

    regl.frame((context) => {
        drawParams.color.forEach((channel, i) => drawParams.color[i] = channel / 255);
        drawParams.time += (context.time - lastTime) * 0.25; // Animation speed
        lastTime = context.time;
        console.log("Drawing background...");
        drawBackground(drawParams);
    });
});
